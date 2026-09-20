// Versions of the legal documents a customer or courier agrees to at sign-up.
// Stored next to the timestamp on the account (users.terms_version), so if the
// wording ever changes materially it is possible to see who agreed to which
// version and to ask people to accept the new one. Bump the date when the
// Terms, Privacy Policy, Refund Policy, Courier Terms or Location Policy
// change in a way people must be told about.
const TERMS_VERSION = '2026-09-19';

// Refund reasons a customer can give. `cancelled_before_accept` and
// `courier_cancelled` are only ever used by the system for automatic refunds.
const REFUND_REASONS = ['damaged', 'not_delivered', 'courier_no_show', 'wrong_price', 'cancelled_after_accept', 'other'];
const SYSTEM_REFUND_REASONS = ['cancelled_before_accept', 'courier_cancelled', 'expired_unaccepted'];

const SUPPORT_CATEGORIES = ['order', 'refund', 'payment', 'account', 'safety', 'feedback', 'other'];

module.exports = { TERMS_VERSION, REFUND_REASONS, SYSTEM_REFUND_REASONS, SUPPORT_CATEGORIES };
