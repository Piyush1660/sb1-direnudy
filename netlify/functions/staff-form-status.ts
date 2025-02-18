import { Handler } from '@netlify/functions';

let isStaffFormOpen = true;

export const handler: Handler = async (event) => {
  // Handling GET request
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({ isStaffFormOpen }),
    };
  }

  // Handling POST request
  if (event.httpMethod === 'POST') {
    try {
      const { isStaffFormOpen: newStatus } = JSON.parse(event.body || '{}');

      // Updating status
      isStaffFormOpen = newStatus;

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, isStaffFormOpen }),
      };
    } catch (error) {
      console.error('Error parsing request body:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: 'Internal Server Error' }),
      };
    }
  }

  // If method is not GET or POST
  return { 
    statusCode: 405, 
    body: JSON.stringify({ message: 'Method Not Allowed' }) 
  };
};
