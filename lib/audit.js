// Every consequential thing an admin does (deciding a refund, recording a
// payment, suspending an account, replying to a ticket) leaves a row here: who,
// what, on what, and any detail. It is the answer to "who approved this and
// when" if a customer or courier ever disputes a decision.
const { sql } = require('./db');

async function audit(actorId, action, target, details) {
  await sql`
    INSERT INTO audit_log (actor_id, action, target, details)
    VALUES (${actorId}, ${action}, ${target || null}, ${details ? String(details).slice(0, 1000) : null})
  `;
}

module.exports = { audit };
