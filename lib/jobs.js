// route_geometry is stored as a JSON-encoded string (see lib/db.js for why)
// but every API response should hand the frontend a real array, not text it
// has to parse itself — one place to do that conversion, applied by every
// endpoint that sends a job row back, rather than each one remembering to.
//
// The public tracking token is a bearer secret for the customer to hand to
// the person receiving the parcel, so it is stripped from every response
// unless the caller says it is the job's own customer (`forCustomer`) —
// couriers get the same rows from several endpoints and must never see it.
function serializeJob(row, { forCustomer = false } = {}) {
  if (!row) return row;
  const job = {
    ...row,
    route_geometry: row.route_geometry ? JSON.parse(row.route_geometry) : null,
  };
  // Whether a PIN is needed is the courier's business; the PIN itself is the customer's to share.
  job.pin_required = !!row.delivery_pin;
  // Until the courier presses Start order the customer is shown no courier location at all: a
  // courier who accepts a job at home isn't putting their home address on a map. (jobs-location
  // refuses to store one before Start; this also covers rows from before Start existed.)
  if (forCustomer && row.status === 'ACCEPTED' && !row.started_at) {
    job.courier_lat = null;
    job.courier_lng = null;
    job.courier_location_updated_at = null;
  }
  if (!forCustomer) {
    delete job.tracking_token;
    delete job.delivery_pin;
  }
  return job;
}

function serializeJobs(rows, options) {
  return rows.map((row) => serializeJob(row, options));
}

// A finished job (delivered or cancelled) is never drawn on a live map again,
// and its route is the heaviest part of the row, so list endpoints send it
// without one. Lists are polled every few seconds; this keeps them small.
function withoutFinishedRoutes(jobs) {
  return jobs.map((job) => (job.status === 'DELIVERED' || job.status === 'CANCELLED' ? { ...job, route_geometry: null } : job));
}

module.exports = { serializeJob, serializeJobs, withoutFinishedRoutes };
