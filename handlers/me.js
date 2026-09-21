const { requireUser } = require('../lib/auth');
const { sendError } = require('../lib/respond');
const { TERMS_VERSION } = require('../lib/legal');
const { verificationRequired } = require('../lib/email');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ detail: 'Method not allowed' });
    return;
  }
  try {
    // A suspended person still has to be able to load their own profile, or
    // the app couldn't tell them what happened or how to appeal.
    const user = await requireUser(req, res, { allowSuspended: true });
    if (!user) return; // requireUser already sent the 401
    res.status(200).json({
      ...user,
      // How a customer is told to pay. Payments are settled by hand for now, so
      // the operator sets the instructions (bank details, or "we'll email you an
      // invoice") in the PAYMENT_INSTRUCTIONS environment variable.
      payment_instructions: process.env.PAYMENT_INSTRUCTIONS
        || 'Payment is arranged with Vendaru support. Contact support@vendaru.com quoting your order reference.',
      terms_version_current: TERMS_VERSION,
      // Whether the email address has been confirmed, and whether confirming it is currently demanded
      // (it is once email can be sent) before posting or accepting an order.
      email_verified: !!user.email_verified_at,
      email_verification_required: verificationRequired(),
    });
  } catch (err) {
    sendError(res, err);
  }
};
