import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'GET') {
    const isStaffFormOpen = process.env.IS_STAFF_FORM_OPEN === 'true';
    return { statusCode: 200, body: JSON.stringify({ isStaffFormOpen }) };
  }

  if (event.httpMethod === 'POST') {
    try {
      const { isStaffFormOpen: newStatus } = JSON.parse(event.body || '{}');

      return { 
        statusCode: 200, 
        body: JSON.stringify({ 
          success: true, 
          isStaffFormOpen: newStatus,
          message: 'Remember to manually update the Netlify environment variable in your dashboard.'
        }) 
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ success: false, message: 'Internal Server Error' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
