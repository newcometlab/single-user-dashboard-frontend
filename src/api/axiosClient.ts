import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.response.use(
  response => response,
  error => {
    console.log('error ======>', error)

    alert(`Request failed: ${error.response?.statusText || 'Unknown error'}`);
    return Promise.reject(error);
  }
);

export default axiosClient;
