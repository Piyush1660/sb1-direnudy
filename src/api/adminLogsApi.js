import axios from 'axios';
export const fetchAdminLogs = async () => {
  const response = await axios.get('/.netlify/functions/admin-logs');
  return response.data;
};
