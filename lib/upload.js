// Shared multipart handling for the two proof-photo endpoints.
//
// Vercel's Node runtime only auto-parses JSON and urlencoded bodies; a
// multipart/form-data request arrives as a raw stream, which is exactly what
// busboy wants. The photo is buffered in memory rather than written to local
// disk — disk on a serverless function is ephemeral per-invocation, so a
// file saved there wouldn't exist by the time the next request came in to
// read it back. It goes to Vercel Blob instead, which is the actual
// persistent home for it.
const crypto = require('crypto');
const busboy = require('busboy');
const { put, del } = require('@vercel/blob');

const CONTENT_TYPE_EXT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/heic': 'heic',
};
// Vercel's serverless functions cap a request body well under what a
// full-resolution phone photo produces (the platform limit sits around
// 4.5MB regardless of anything checked here), so the limit is set below
// that rather than at a number that would let the platform itself reject
// the upload first with a less useful error than this one.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

class UploadError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

function readPhotoField(req) {
  return new Promise((resolve, reject) => {
    let bb;
    try {
      bb = busboy({ headers: req.headers, limits: { fileSize: MAX_UPLOAD_BYTES, files: 1 } });
    } catch {
      reject(new UploadError(400, 'Malformed upload request'));
      return;
    }

    let found = null;
    let tooBig = false;
    const chunks = [];

    bb.on('file', (fieldName, stream, info) => {
      if (fieldName !== 'photo') {
        stream.resume(); // drain and ignore any other field
        return;
      }
      found = info; // { filename, encoding, mimeType }
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('limit', () => { tooBig = true; });
    });

    bb.on('finish', () => {
      if (tooBig) {
        reject(new UploadError(413, 'Photo is larger than 4MB — most phones can save a smaller size, or crop it a little'));
        return;
      }
      if (!found || !chunks.length) {
        reject(new UploadError(400, "No 'photo' file field found in the upload"));
        return;
      }
      resolve({ buffer: Buffer.concat(chunks), mimeType: found.mimeType });
    });

    bb.on('error', (err) => reject(new UploadError(400, `Could not read upload: ${err.message}`)));
    req.pipe(bb);
  });
}

// The declared Content-Type is whatever the sender says it is, so the file's
// own first bytes are checked against it too — otherwise an HTML file labelled
// image/jpeg would be stored (and later shown) as "proof".
function looksLikeImage(buffer, mimeType) {
  switch (mimeType) {
    case 'image/jpeg':
      return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    case 'image/png':
      return buffer.length >= 4 && buffer[0] === 0x89 && buffer.toString('latin1', 1, 4) === 'PNG';
    case 'image/webp':
      return buffer.length >= 12 && buffer.toString('latin1', 0, 4) === 'RIFF' && buffer.toString('latin1', 8, 12) === 'WEBP';
    case 'image/heic':
      return buffer.length >= 8 && buffer.toString('latin1', 4, 8) === 'ftyp';
    default:
      return false;
  }
}

// Reads the "photo" field from a multipart request and stores it in Vercel
// Blob under `${folder}/job${jobId}-<random>.<ext>`. Returns the public URL.
async function savePhoto(req, folder, jobId) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new UploadError(503, 'Photo storage is not set up yet (BLOB_READ_WRITE_TOKEN is missing) — nothing you did wrong.');
  }
  const { buffer, mimeType } = await readPhotoField(req);

  const ext = CONTENT_TYPE_EXT[mimeType];
  if (!ext) {
    throw new UploadError(415, `'${mimeType}' isn't a supported photo type — send jpeg, png, webp or heic`);
  }
  if (!looksLikeImage(buffer, mimeType)) {
    throw new UploadError(415, "That file doesn't look like a real photo — try taking it again");
  }

  // crypto, not Math.random: the URL is the only thing protecting a public blob.
  const pathname = `${folder}/job${jobId}-${Date.now().toString(36)}-${crypto.randomBytes(12).toString('hex')}.${ext}`;
  const blob = await put(pathname, buffer, {
    access: 'public',
    contentType: mimeType,
    addRandomSuffix: false,
  });
  return blob.url;
}

// Removes a photo that turned out not to be wanted — an upload whose job was
// cancelled while it was still in flight. Best effort: a failure to clean up
// is logged, never allowed to change the response the courier gets.
async function deletePhoto(url) {
  if (!url) return;
  try {
    await del(url);
  } catch (err) {
    console.warn('could not delete orphaned photo —', err && err.message);
  }
}

module.exports = { savePhoto, deletePhoto, UploadError };
