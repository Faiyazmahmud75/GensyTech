export async function handler(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Use .trim() to remove any invisible whitespace from settings
  // The webhook URL for the AI Agent
  let WEBHOOK_URL = process.env.MAKE_CHAT_WEBHOOK_URL?.trim();
  if (WEBHOOK_URL && WEBHOOK_URL.startsWith('MAKE_CHAT_WEBHOOK_URL:')) {
    WEBHOOK_URL = WEBHOOK_URL.replace('MAKE_CHAT_WEBHOOK_URL:', '').trim();
  }
  
  // Re-use the existing API key strategy from the main booking endpoint, or fallback to MAKE_API_KEY
  const API_KEY = process.env.MAKE_CHAT_API_KEY?.trim() || process.env.MAKE_API_KEY?.trim();

  if (!WEBHOOK_URL || !API_KEY) {
    console.error('Missing environment variables: MAKE_CHAT_WEBHOOK_URL or API Key');
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
      // Expecting Make.com Webhook Response module to return the AI's reply
      // E.g. { "reply": "Sure, I can help you with that!" }
      let aiResponseText = "";
      
      const textResponse = await response.text();
      try {
        const jsonResponse = JSON.parse(textResponse);
        // Make.com might return `{ "reply": "..." }` based on our frontend expectation
        aiResponseText = jsonResponse.reply || jsonResponse.message || textResponse;
      } catch (e) {
        // If not JSON, assume raw text response from Make.com
        aiResponseText = textResponse;
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ reply: aiResponseText })
      };
    } else {
      const errorText = await response.text();
      console.error('Make.com proxy error:', errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to communicate with AI Agent' })
      };
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message
      })
    };
  }
}
