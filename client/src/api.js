import axios from 'axios';

const BASE_URL = 'https://innovativestaffing.onrender.com'; 
const api = axios.create({

  baseURL: 'https://innovativestaffing.onrender.com', 
  baseURL: BASE_URL,

});

export { BASE_URL };
export default api;
