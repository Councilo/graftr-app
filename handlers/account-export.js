// "Download my data" — a copy of everything Vendaru holds about the signed-in
// person, as JSON (UK GDPR right of access). It covers their own records only:
// where another person is involved (the courier on a customer's job, say) the
// export carries their id, not their name, email or location history.
const { sql, ensureSchema } = require('../lib/db');
const { requireUser } = require('../lib/auth');
const { serializeJobs } = require('../lib/jobs');
const { sendError } = require('../lib/respond');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    const user = await requireUser(req, res, { allowSuspended: true });
    if (!user) return;

    await ensureSchema();
    const jobs = await sql`
      SELECT id, customer_id, courier_id, pickup_address, dropoff_address, pickup_lat, pickup_lng,
             dropoff_lat, dropoff_lng, pickup_window_start, pickup_window_end, distance_km, price_gbp,
             status, pickup_photo_url, delivery_photo_url, route_geometry,
             created_at, accepted_at, collected_at, delivered_at, cancelled_at
      FROM jobs WHERE customer_id = ${user.id} OR courier_id = ${user.id}
      ORDER BY id
    `;
    const messages = await sql`SELECT id, job_id, sender_role, content, created_at FROM messages WHERE sender_id = ${user.id} ORDER BY id`;
    const payments = await sql`
      SELECT job_id, amount_gbp, refunded_gbp, status, method, reference, paid_at, created_at
      FROM payments WHERE customer_id = ${user.id} ORDER BY id
    `;
    const refunds = await sql`
      SELECT id, job_id, reason, details, amount_gbp, status, approved_gbp, decision_note, decided_at, created_at
      FROM refund_requests WHERE customer_id = ${user.id} ORDER BY id
    `;
    const tickets = await sql`
      SELECT id, category, subject, message, job_id, status, created_at, updated_at
      FROM support_tickets WHERE user_id = ${user.id} ORDER BY id
    `;
    const replies = await sql`
      SELECT r.ticket_id, r.sender_role, r.content, r.created_at
      FROM support_replies r JOIN support_tickets t ON t.id = r.ticket_id
      WHERE t.user_id = ${user.id} ORDER BY r.id
    `;

    res.setHeader('Content-Disposition', 'attachment; filename="vendaru-my-data.json"');
    res.status(200).json({
      exported_at: new Date().toISOString(),
      account: {
        id: user.id, email: user.email, full_name: user.full_name, phone: user.phone || null, role: user.role,
        terms_accepted_at: user.terms_accepted_at, location_consent_at: user.location_consent_at,
      },
      jobs: serializeJobs(jobs.rows),
      messages_you_sent: messages.rows,
      payments: payments.rows,
      refund_requests: refunds.rows,
      support_tickets: tickets.rows.map((t) => ({ ...t, replies: replies.rows.filter((r) => r.ticket_id === t.id) })),
    });
  } catch (err) {
    sendError(res, err);
  }
};
