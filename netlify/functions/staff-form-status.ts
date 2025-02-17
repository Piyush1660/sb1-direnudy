import { Handler } from '@netlify/functions';
import fs from 'fs';
import path from 'path';

// Define the path to the status file
const statusFilePath = path.join(__dirname, 'staff-form-status.json');

// Initialize the status in case the file doesn't exist yet
const initializeStatus = () => {
  if (!fs.existsSync(statusFilePath)) {
    fs.writeFileSync(statusFilePath, JSON.stringify({ isStaffFormOpen: true }), 'utf-8');
  }
};

// Initialize the status file when the function is first loaded
initializeStatus();

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'GET') {
    try {
      // Read the current status from the file
      const statusData = fs.readFileSync(statusFilePath, 'utf-8');
      const { isStaffFormOpen } = JSON.parse(statusData);

      return { statusCode: 200, body: JSON.stringify({ isStaffFormOpen }) };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ success: false, message: 'Failed to read staff form status' }) };
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const { isStaffFormOpen: newStatus } = JSON.parse(event.body || '{}');
      
      // Update the status in the file
      const updatedStatus = { isStaffFormOpen: newStatus };
      fs.writeFileSync(statusFilePath, JSON.stringify(updatedStatus), 'utf-8');

      return { statusCode: 200, body: JSON.stringify({ success: true, isStaffFormOpen: newStatus }) };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ success: false, message: 'Failed to update staff form status' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
