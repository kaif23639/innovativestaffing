import axios from 'axios';

const BASE_URL = 'https://innovative-staffing-1.onrender.com'; 
const api = axios.create({

  baseURL: 'https://innovative-staffing-1.onrender.com', 
  baseURL: BASE_URL,

});

export { BASE_URL };
export default api;
