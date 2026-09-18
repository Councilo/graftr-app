// Shared multipart handling for the two proof-photo endpoints.
//
// Vercel's Node runtime only auto-parses JSON and urlencoded bodies; a
// multipart/form-data request arrives as a raw stream, which is exactly what
// busboy wants. The photo is buffered in memory rather than written to local
// disk — disk on a serverless function is ephemeral per-invocation, so a
// file saved there wouldn't exist by the time the next request came in to
// read it back. It goes to Vercel Blob instead, which is the actual
// persistent home for it.
const busboy = require('busboy');
const { put } = require('@vercel/blob');

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

// Reads the "photo" field from a multipart request and stores it in Vercel
// Blob under `${folder}/job${jobId}-<random>.<ext>`. Returns the public URL.
async function savePhoto(req, folder, jobId) {
  const { buffer, mimeType } = await readPhotoField(req);

  const ext = CONTENT_TYPE_EXT[mimeType];
  if (!ext) {
    throw new UploadError(415, `'${mimeType}' isn't a supported photo type — send jpeg, png, webp or heic`);
  }

  const pathname = `${folder}/job${jobId}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const blob = await put(pathname, buffer, {
    access: 'public',
    contentType: mimeType,
    addRandomSuffix: false,
  });
  return blob.url;
}

module.exports = { savePhoto, UploadError };
