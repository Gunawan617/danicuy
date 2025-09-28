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

export const bannerService = {
  getAllBanners: async () => {
    const response = await api.get('/banners');
    return response.data;
  },
  getBannerById: async (id: string) => {
    const response = await api.get(`/banners/${id}`);
    return response.data;
  },
  createBanner: async (formData: FormData) => {
    const response = await api.post('/banners', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  updateBanner: async (id: string, formData: FormData) => {
    const response = await api.put(`/banners/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  deleteBanner: async (id: string) => {
    const response = await api.delete(`/banners/${id}`);
    return response.data;
  },
};

export const articleService = {
  getAllArticles: async () => {
    const response = await api.get('/articles');
    return response.data;
  },
  getArticleById: async (id: string) => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  },
  createArticle: async (formData: FormData) => {
    const response = await api.post('/articles', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  updateArticle: async (id: string, formData: FormData) => {
    const response = await api.put(`/articles/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  deleteArticle: async (id: string) => {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  },
};

export const bookService = {
  getAllBooks: async () => {
    const response = await api.get('/books');
    return response.data;
  },
  getBookById: async (id: string) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },
  createBook: async (formData: FormData) => {
    const response = await api.post('/books', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  updateBook: async (id: string, formData: FormData) => {
    const response = await api.put(`/books/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  deleteBook: async (id: string) => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },
};

import { FAQ, User } from '@/types';

export const faqService = {
  getAllFAQs: async () => {
    const response = await api.get('/faqs');
    return response.data;
  },
  getFAQById: async (id: string) => {
    const response = await api.get(`/faqs/${id}`);
    return response.data;
  },
  createFAQ: async (faqData: Partial<FAQ>) => {
    const response = await api.post('/faqs', faqData);
    return response.data;
  },
  updateFAQ: async (id: string, faqData: Partial<FAQ>) => {
    const response = await api.put(`/faqs/${id}`, faqData);
    return response.data;
  },
  deleteFAQ: async (id: string) => {
    const response = await api.delete(`/faqs/${id}`);
    return response.data;
  },
};

export const bimbelPackageService = {
  getAllBimbelPackages: async () => {
    const response = await api.get('/bimbel-packages');
    return response.data;
  },
  getBimbelPackageById: async (id: string) => {
    const response = await api.get(`/bimbel-packages/${id}`);
    return response.data;
  },
  createBimbelPackage: async (formData: FormData) => {
    const response = await api.post('/bimbel-packages', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  updateBimbelPackage: async (id: string, formData: FormData) => {
    const response = await api.put(`/bimbel-packages/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  deleteBimbelPackage: async (id: string) => {
    const response = await api.delete(`/bimbel-packages/${id}`);
    return response.data;
  },
};

export const tryoutPackageService = {
  getAllTryoutPackages: async () => {
    const response = await api.get('/tryout-packages');
    return response.data;
  },
  getTryoutPackageById: async (id: string) => {
    const response = await api.get(`/tryout-packages/${id}`);
    return response.data;
  },
  createTryoutPackage: async (formData: FormData) => {
    const response = await api.post('/tryout-packages', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  updateTryoutPackage: async (id: string, formData: FormData) => {
    const response = await api.put(`/tryout-packages/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  deleteTryoutPackage: async (id: string) => {
    const response = await api.delete(`/tryout-packages/${id}`);
    return response.data;
  },
};

export const userService = {
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  getUserById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  updateUser: async (id: string, userData: Partial<User>) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export default api;