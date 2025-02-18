import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { username, password } = JSON.parse(event.body || '{}');

  // Get staff credentials from environment variables
  const validUsername = process.env.VITE_STAFF_USERNAME;
  const validPassword = process.env.VITE_STAFF_PASSWORD;

  if (username === validUsername && password === validPassword) {
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } else {
    return { statusCode: 401, body: JSON.stringify({ success: false }) };
  }
};

