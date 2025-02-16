import axios from 'axios';
export const fetchFormStats = async () => {
  const response = await axios.get('/.netlify/functions/form-stats');
  return response.data;
};
