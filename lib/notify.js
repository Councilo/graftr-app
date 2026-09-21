// Order updates by email to the customer: listed, accepted, courier set off, collected, delivered.
//
// Best effort by design: a failed email never fails the order step that triggered it. It is awaited
// (a serverless function can be frozen the moment it responds) but sendEmail gives up after 5 seconds.
// Once email is switched on, only confirmed addresses are ever written to, so someone who signs up
// with another person's address can't use Vendaru to send that person mail.
const { sql, ensureSchema } = require('./db');
const { sendEmail, verificationRequired, appUrl } = require('./email');
const { createToken } = require('./email-tokens');
const mail = require('./mail');

async function notifyCustomer(job, event, extra = {}) {
  try {
    if (!job || !mail[event]) return false;
    await ensureSchema();
    const { rows } = await sql`SELECT email, full_name, email_verified_at FROM users WHERE id = ${job.customer_id} AND deleted_at IS NULL`;
    const customer = rows[0];
    if (!customer) return false;
    if (verificationRequired() && !customer.email_verified_at) return false;
    const message = mail[event]({ name: customer.full_name, job, ...extra });
    return await sendEmail({ to: customer.email, ...message });
  } catch (err) {
    console.error('email: could not send the order update', err && err.message);
    return false;
  }
}

// "Confirm your email": a new link (which retires any older one) sent to the address on the account.
// user: { id, email, full_name }
async function sendVerificationEmail(user) {
  try {
    const token = await createToken(user.id, 'verify', user.email);
    return await sendEmail({ to: user.email, ...mail.verifyEmail({ name: user.full_name, link: `${appUrl()}/#verify=${token}` }) });
  } catch (err) {
    console.error('email: could not send the confirmation email', err && err.message);
    return false;
  }
}

async function sendPasswordResetEmail(user) {
  try {
    const token = await createToken(user.id, 'reset', user.email);
    return await sendEmail({ to: user.email, ...mail.resetPassword({ name: user.full_name, link: `${appUrl()}/#reset=${token}` }) });
  } catch (err) {
    console.error('email: could not send the reset email', err && err.message);
    return false;
  }
}

module.exports = { notifyCustomer, sendVerificationEmail, sendPasswordResetEmail };
