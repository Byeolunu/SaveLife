import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization; 
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const fetchCampaignProgress = async () => {
  try {
    const response = await api.get('/campaigns/progress/');
    return response.data;
  } catch (error) {
    console.error('Error fetching campaign progress:', error);
    return [];
  }
};

export default api;