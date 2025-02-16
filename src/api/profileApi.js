import axios from 'axios';
export const updateProfile = async (profileData) => {
  const response = await axios.post('/.netlify/functions/update-profile', profileData);
  return response.data;
};
