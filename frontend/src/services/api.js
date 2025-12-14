import axios from 'axios';

// Debugging: Print this to the browser console to see what Vercel sees
console.log("Current API URL:", import.meta.env.VITE_API_URL);

// Automatically chooses the right URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Before every request, check if we have a token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;