"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, type User } from '../lib/api';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: { nama: string; email: string; password: string; profesi: string; jenjang: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  checkAuth: () => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth data on mount
    checkAuth();
  }, []);

  const checkAuth = () => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user_data');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
        setIsLoggedIn(true);
        setLoading(false);
        return true;
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        logout();
        setLoading(false);
        return false;
      }
    }
    setLoading(false);
    return false;
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await apiService.login({ email, password });

      if (response.success) {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_data', JSON.stringify(response.user));
        setToken(response.token);
        setUser(response.user);
        setIsLoggedIn(true);
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Login gagal' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Terjadi kesalahan saat login' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: { nama: string; email: string; password: string; profesi: string; jenjang: string }) => {
    try {
      setLoading(true);
      const response = await apiService.register(userData);
      return response;
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'Terjadi kesalahan saat registrasi' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    user,
    token,
    login,
    register,
    logout,
    checkAuth,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper component for protecting routes/actions
export function AuthGuard({
  children,
  fallback
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { isLoggedIn, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isLoggedIn) {
    return fallback || (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Anda perlu login untuk mengakses fitur ini</p>
        <button
          onClick={() => window.location.href = '#login'}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    );
  }

  return <>{children}</>;
}


