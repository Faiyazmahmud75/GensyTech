export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;
  // Use the MAKE_API_KEY environment variable (NOT stored in code)
  const API_KEY = process.env.MAKE_API_KEY; 

  if (!WEBHOOK_URL || !API_KEY) {
    console.error('Missing environment variables: MAKE_WEBHOOK_URL or MAKE_API_KEY');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-make-apikey': API_KEY 
      },
      body: JSON.stringify(req.body)
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errorText = await response.text();
      console.error('Make.com error:', errorText);
      return res.status(response.status).json({ error: 'Failed to forward to Make.com' });
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
