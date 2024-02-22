import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080', // input API from BE
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('accessToken')}`,
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('check: ', error.response.data.error);
    return Promise.reject(error);
  }
);

// Hàm để cập nhật header Authorization
export const updateAuthorizationHeader = () => {
  axiosClient.defaults.headers['Authorization'] = `Bearer ${Cookies.get('accessToken')}`;
};

export default axiosClient;
