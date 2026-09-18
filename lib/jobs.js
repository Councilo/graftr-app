// route_geometry is stored as a JSON-encoded string (see lib/db.js for why)
// but every API response should hand the frontend a real array, not text it
// has to parse itself — one place to do that conversion, applied by every
// endpoint that sends a job row back, rather than each one remembering to.
function serializeJob(row) {
  if (!row) return row;
  return {
    ...row,
    route_geometry: row.route_geometry ? JSON.parse(row.route_geometry) : null,
  };
}

function serializeJobs(rows) {
  return rows.map(serializeJob);
}

module.exports = { serializeJob, serializeJobs };
