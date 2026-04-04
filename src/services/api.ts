import axios from 'axios';
import { useAuthStore } from '@/store';

/**
 * @description Enterprise Axios Instance Configuration for 80,000 node ERP.
 * Configured with baseURL pointing to the v1 Matrix Shard.
 * withCredentials enabled for secure HTTP-Only cookie token rotation.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  withCredentials: true, // Mission Critical: Required for Matrix Session Cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Syncs accessToken into headers for fallback compatibility
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handles Matrix node failures and session expiry
api.interceptors.response.use(
  (response) => response.data, // Automatically extract ApiResponse.data
  async (error) => {
    const originalRequest = error.config;

    // Handle 401: Attempt Matrix Token Rotation if not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt refresh-token call via Matrix Shard
        const response = await axios.post('http://localhost:8000/api/v1/auth/refresh-token', {}, {
          withCredentials: true
        });
        
        const { accessToken } = response.data.data;
        useAuthStore.getState().login(useAuthStore.getState().user!, accessToken);
        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
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
