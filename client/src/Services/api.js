import axios from 'axios';

//creating a connection to the backend
const API = axios.create({
    baseURL: "http://localhost:4000/api"     //slash api cause that's what is common in the backend
});

// Creating an interceptor to automatically attach JWT token to all requests
API.interceptors.request.use(cfg => {
    const token = localStorage.getItem("token");
    if(token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});

export default API