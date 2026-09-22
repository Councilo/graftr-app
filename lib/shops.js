// Partner shops: a corner shop or mini market that posts a bag for a walker to carry to a customer.
// A shop is a customer account with one row here attached (owner_user_id) — not a new role — so
// signing in, browsing, ordering for themselves and everything else about the account is unchanged.
const { sql } = require('./db');

const SHOP_STATUSES = ['pending', 'approved', 'suspended'];
const MAX_NAME = 100;
const MAX_ADDRESS = 300;
const MAX_PHONE = 30;
const MAX_HOURS = 200;
const MAX_NOTES = 300;

// The shop this user owns, or null. At most one per account (shops_owner_idx).
async function shopForOwner(userId) {
  const { rows } = await sql`SELECT * FROM shops WHERE owner_user_id = ${userId}`;
  return rows[0] || null;
}

module.exports = { SHOP_STATUSES, MAX_NAME, MAX_ADDRESS, MAX_PHONE, MAX_HOURS, MAX_NOTES, shopForOwner };
