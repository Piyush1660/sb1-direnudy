import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async (event) => {
  // 1. Grab the "code" query parameter from the URL
  const code = event.queryStringParameters?.code;
  if (!code) {
    return { statusCode: 400, body: 'Missing "code" parameter' };
  }

  // 2. Read environment variables from Netlify’s environment (you’ll set them in the Netlify dashboard)
  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI; // e.g. "https://citytownrp.netlify.app/.netlify/functions/discord-auth"

  try {
    // 3. Exchange the code for an access token
    const tokenResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: clientId!,
        client_secret: clientSecret!,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri!,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const accessToken = tokenResponse.data.access_token;

    // 4. Retrieve user data from Discord
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // 5. Return the user data as JSON
    // In production, you may set a secure cookie or JWT instead of returning raw data
    return {
      statusCode: 200,
      body: JSON.stringify(userResponse.data),
    };
  } catch (error: any) {
    console.error('Error in OAuth callback:', error.response?.data || error.message);
    return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
  }
};

export { handler };
