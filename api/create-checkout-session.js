const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    res.status(500).json({ error: 'Stripe is not configured on the server yet.' });
    return;
  }

  try {
    const stripe = new Stripe(secretKey);
    const { items, deliveryFee } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'No items provided' });
      return;
    }

    const line_items = items.map((it) => ({
      price_data: {
        currency: 'gbp',
        product_data: { name: String(it.name || 'Item').slice(0, 200) },
        unit_amount: Math.round(Number(it.unitPrice) * 100),
      },
      quantity: Math.max(1, Math.round(Number(it.qty) || 1)),
    }));

    if (deliveryFee) {
      line_items.push({
        price_data: {
          currency: 'gbp',
          product_data: { name: 'Service fee' },
          unit_amount: Math.round(Number(deliveryFee) * 100),
        },
        quantity: 1,
      });
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?payment=cancelled`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe session error:', err);
    res.status(500).json({ error: err.message });
  }
};
