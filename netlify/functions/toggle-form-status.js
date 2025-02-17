const fs = require('fs');
const path = require('path');
const formStatusPath = path.resolve(__dirname, 'form-status.json'); // Path to the JSON file

exports.handler = async (event) => {
  if (event.httpMethod === 'GET') {
    // Read the current form status from the JSON file
    try {
      const data = fs.readFileSync(formStatusPath, 'utf8');
      const status = JSON.parse(data);
      return {
        statusCode: 200,
        body: JSON.stringify({ isStaffFormOpen: status.isStaffFormOpen }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: 'Error reading status file' }),
      };
    }
  }

  if (event.httpMethod === 'POST') {
    // Parse the request body
    const { isStaffFormOpen } = JSON.parse(event.body || '{}');

    // Update the status in the JSON file
    try {
      const status = { isStaffFormOpen };
      fs.writeFileSync(formStatusPath, JSON.stringify(status, null, 2), 'utf8');
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          isStaffFormOpen,
          message: 'Form status updated!',
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: 'Error updating status file' }),
      };
    }
  }

  return {
    statusCode: 405,
    body: 'Method Not Allowed',
  };
};
