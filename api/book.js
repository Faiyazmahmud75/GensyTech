export async function handler(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Use .trim() to remove any invisible whitespace from Netlify settings
  // Strip any 'MAKE_WEBHOOK_URL: ' prefix if the user pasted it by mistake
  let WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL?.trim();
  if (WEBHOOK_URL && WEBHOOK_URL.startsWith('MAKE_WEBHOOK_URL:')) {
    WEBHOOK_URL = WEBHOOK_URL.replace('MAKE_WEBHOOK_URL:', '').trim();
  }
  
  const API_KEY = process.env.MAKE_API_KEY?.trim();

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
      body: JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message,
        stack: error.stack
      })
    };
  }
}
