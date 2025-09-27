import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API service functions
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

export const tryoutService = {
  getAllPackages: async () => {
    const response = await api.get('/tryout/packages');
    return response.data;
  },
  getPurchasedPackages: async () => {
    const response = await api.get('/tryout/my-packages');
    return response.data;
  },
  startTryout: async (packageId: string) => {
    const response = await api.post(`/tryout/start/${packageId}`);
    return response.data;
  },
};

export const bimbelService = {
  getAllPackages: async () => {
    const response = await api.get('/bimbel/packages');
    return response.data;
  },
  getPurchasedPackages: async () => {
    const response = await api.get('/bimbel/my-packages');
    return response.data;
  },
};

export default api;