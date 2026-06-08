import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const { token } = JSON.parse(userInfo);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor for unified error formatting
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // We can extract the custom error message sent by our backend
        if (error.response && error.response.data && error.response.data.message) {
            error.message = error.response.data.message;
        }
        return Promise.reject(error);
    }
);

export default api;
