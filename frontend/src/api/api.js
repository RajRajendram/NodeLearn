import axios from 'axios';

//Create an Axios instance with base URL
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});


// Interceptor for handling error globally (Optional)
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status === 401){
            // Handle unauthorized request (Eg: token expiration)
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;