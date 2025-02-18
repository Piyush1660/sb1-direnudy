import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'GET') {
    // Use the Netlify environment variable to control the staff form status.
    // Set STAFF_FORM_OPEN in your Netlify dashboard to "true" or "false"
    const isStaffFormOpen = process.env.STAFF_FORM_OPEN === 'true';
    return {
      statusCode: 200,
      body: JSON.stringify({ isStaffFormOpen }),
    };
  }
  
  // For any other method, return 405 Method Not Allowed
  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};
