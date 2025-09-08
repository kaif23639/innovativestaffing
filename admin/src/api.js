import axios from 'axios';
const BASE_URL = 'https://innovativestaffing.onrender.com';
const api = axios.create({

  baseURL: 'https://innovativestaffing.onrender.com', 

  baseURL: BASE_URL, 
});


api.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export { BASE_URL };
export default api;
