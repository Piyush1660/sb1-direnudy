import { Handler } from '@netlify/functions';

let isStaffFormOpen = true;

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({ isStaffFormOpen }),
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const { isStaffFormOpen: newStatus } = JSON.parse(event.body || '{}');
      isStaffFormOpen = newStatus;
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, isStaffFormOpen }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: 'Internal Server Error' }),
      };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
