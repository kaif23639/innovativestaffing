import axios from 'axios';

const api = axios.create({
  baseURL: 'https://innovative-staffing-1.onrender.com', // adapt as needed
});

export default api;
