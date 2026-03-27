export async function handler(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;
  const API_KEY = process.env.MAKE_API_KEY;

  if (!WEBHOOK_URL || !API_KEY) {
    console.error('Missing environment variables: MAKE_WEBHOOK_URL or MAKE_API_KEY');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error' })
    };
  }

  try {
    const data = JSON.parse(event.body);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-make-apikey': API_KEY
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } else {
      const errorText = await response.text();
      console.error('Make.com error:', errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed' })
      };
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}
