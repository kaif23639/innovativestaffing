import axios from 'axios';
const BASE_URL = 'https://innovative-staffing-1.onrender.com';
const api = axios.create({

  baseURL: 'https://innovative-staffing-1.onrender.com', // Your backend URL

  baseURL: BASE_URL, // Your backend URL

});

// Attach JWT token to each request if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export { BASE_URL };
export default api;
