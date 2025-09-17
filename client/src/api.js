import axios from 'axios';

const BASE_URL = 'https://innovativestaffing-updated.onrender.com'; 
const api = axios.create({

  baseURL: 'https://innovativestaffing-updated.onrender.com', 
  baseURL: BASE_URL,

});

export { BASE_URL };
export default api;
