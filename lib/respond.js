// One place for turning a thrown error into an HTTP response, so every
// endpoint's catch block looks the same and a configuration error (missing
// JWT_SECRET, missing POSTGRES_URL) reads as a clear message rather than a
// bare 500 with no explanation.
function sendError(res, err) {
  const status = err.statusCode || 500;
  const message = err.publicMessage
    || (status === 500 ? 'Something went wrong on our end.' : err.message);
  if (status === 500) {
    // The full error, stack included, goes to the server log where only the
    // operator sees it. The response carries a message safe for a stranger
    // to read — never err.message directly at 500, since an unexpected
    // exception (a database error, say) can echo back things like table
    // names or connection details that are nobody else's business.
    console.error(err);
  }
  res.status(status).json({ detail: message });
}

module.exports = { sendError };
