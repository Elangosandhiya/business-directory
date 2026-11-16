import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to format errors cleanly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message:
        error.response?.data?.error?.message ||
        error.message ||
        'An unexpected error occurred while communicating with the server.',
      status: error.response?.status || 500,
      details: error.response?.data?.error?.details || null,
      isCancelled: axios.isCancel(error),
    };
    return Promise.reject(customError);
  }
);

export default api;
