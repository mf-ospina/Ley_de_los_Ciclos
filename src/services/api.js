import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://67ba010a51192bd378df0d29.mockapi.io/bandidasApi/';
/*const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/';*/

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
