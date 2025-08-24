import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Your backend URL
  // You can add headers or interceptors here if needed
});

// Attach JWT token to each request if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
