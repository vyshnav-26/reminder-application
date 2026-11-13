import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Provide clean logging for network/CORS/server issues
    console.warn(`[API Client Error] ${error.config?.url}:`, error.message);
    return Promise.reject(error);
  }
);

export const checkBackendHealth = async (): Promise<{ status: string; connected: boolean }> => {
  try {
    const res = await apiClient.get('/health');
    return { status: res.data?.status || 'UP', connected: true };
  } catch (error: any) {
    return { status: error.message || 'Offline', connected: false };
  }
};
