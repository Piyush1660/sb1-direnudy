import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async (event) => {
  const code = event.queryStringParameters?.code;
  if (!code) {
    return { statusCode: 400, body: 'Missing code parameter' };
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI; // e.g. https://citytownrp.netlify.app/.netlify/functions/discord-auth

  try {
    // 1. Exchange the code for an access token
    const tokenResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: clientId!,
        client_secret: clientSecret!,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri!,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // 2. Retrieve user info
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // 3. Instead of returning JSON, do a 302 redirect to your main page
    //    Attach user data in the query param: ?discordUser=...
    const userData = JSON.stringify(userResponse.data);

    return {
      statusCode: 302,
      headers: {
        Location: `https://citytownrp.netlify.app/?discordUser=${encodeURIComponent(userData)}`,
      },
      body: '',
    };
  } catch (error: any) {
    console.error('Error in OAuth callback:', error.response?.data || error.message);
    return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
  }
};

export { handler };
