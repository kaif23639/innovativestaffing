import axios from 'axios';

const api = axios.create({
  baseURL: 'https://innovative-backend.onrender.com/api', // adapt as needed
});

export default api;
