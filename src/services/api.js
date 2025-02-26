import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://67ba010a51192bd378df0d29.mockapi.io/bandidasApi/';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://bandidgirlsapi-bna9f9hsa9b7bkfj.canadacentral-01.azurewebsites.net/api/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;


// https://localhost:7166/api/magicalGirls