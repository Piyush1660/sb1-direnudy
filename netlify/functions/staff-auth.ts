// functions/staff-auth.ts

import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  // Parse the request body
  const { username, password } = JSON.parse(event.body || '{}');

  // Get staff credentials from environment variables
  const validUsername = process.env.VITE_STAFF_USERNAME;
  const validPassword = process.env.VITE_STAFF_PASSWORD;

  // Check if the provided credentials are correct
  if (username === validUsername && password === validPassword) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false }),
    };
  }
};

export { handler };
