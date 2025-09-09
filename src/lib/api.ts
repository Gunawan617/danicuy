// API service for communicating with the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface Paket {
  id: number;
  nama: string;
  profesi: string;
  jenjang: string;
  durasi_bulan: number;
  harga: number;
  fitur: string;
  jumlah_soal: number;
  tipe: 'tryout' | 'bimbel';
  deskripsi: string;
  target_audience: string;
}

export interface User {
  id: number;
  nama: string;
  email: string;
  profesi: string;
  jenjang: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nama: string;
  email: string;
  password: string;
  profesi: string;
  jenjang: string;
}

export interface OrderRequest {
  user_id: number;
  paket_id: number;
  bukti_transfer: string;
}

class ApiService {
  private getAuthHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async getPaket(): Promise<Paket[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/paket`);
      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }
      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching packages:', error);
      throw error;
    }
  }

  async login(credentials: LoginRequest): Promise<{ success: boolean; token: string; user: User; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Failed to login');
    }
  }

  async register(userData: RegisterRequest): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw new Error('Failed to register');
    }
  }

  async createOrder(orderData: OrderRequest, token: string): Promise<{ success: boolean; message: string; order_id?: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: this.getAuthHeaders(token),
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Order creation error:', error);
      throw new Error('Failed to create order');
    }
  }

  async getUserPackages(token: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/packages`, {
        headers: this.getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user packages');
      }

      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching user packages:', error);
      throw error;
    }
  }

  async getExamHistory(token: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/exam-history`, {
        headers: this.getAuthHeaders(token),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch exam history');
      }

      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error('Error fetching exam history:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
