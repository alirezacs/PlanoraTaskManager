import axios from 'axios';
import { redirect } from 'next/navigation';
import { Router } from 'next/router';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  withXSRFToken: true
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      toast.error('Session expired. Redirecting to login...');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;