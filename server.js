const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));

// Secure AI API Proxy Endpoint for Claude
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: "No ANTHROPIC_API_KEY set on server." });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 500,
        system: "You are a helpful customer assistant for Graftr, a fast grocery delivery app. Help customers find products, answer delivery questions, and recommend items.",
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    if (data.content && data.content[0]) {
      return res.json({ reply: data.content[0].text });
    } else {
      return res.status(500).json({ error: "Claude API error", details: data });
    }
  } catch (error) {
    console.error("AI Proxy Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Live Courier GPS Tracking Endpoints
let latestCourierLocation = null;

app.post('/api/courier/location', (req, res) => {
  const { lat, lng, courierId, timestamp } = req.body;
  if (lat && lng) {
    latestCourierLocation = { lat, lng, courierId: courierId || 'Alex', timestamp: timestamp || Date.now() };
    return res.json({ success: true, location: latestCourierLocation });
  }
  return res.status(400).json({ error: "Invalid coordinates" });
});

app.get('/api/courier/location', (req, res) => {
  res.json({ location: latestCourierLocation });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Graftr running at http://localhost:${PORT}`);
});
