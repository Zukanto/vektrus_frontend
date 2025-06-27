import axios from 'axios';

// Create an axios instance with default config
export const api = axios.create({
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add the API key
api.interceptors.request.use((config) => {
  config.headers['x-key'] = 'ecf4009c-f5d8-4b3f-9572-e7aaaf9a5614';
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);