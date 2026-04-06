import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';

/**
 * Enterprise Axios Instance Configuration for 80,000+ Node ERP.
 * Configured with baseURL pointing to the backend API.
 * withCredentials enabled for secure HTTP-Only cookie token rotation.
 */
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Syncs accessToken into headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handles Matrix node failures and session expiry
api.interceptors.response.use(
  (response) => response.data, 
  async (error) => {
    const originalRequest = error.config;

    // Handle 401: Attempt Token Rotation if not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        
        const { accessToken } = response.data.data;
        useAuthStore.getState().setToken(accessToken);
        
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        if (typeof window !== 'undefined') window.location.href = '/login';
      }
    }

    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
