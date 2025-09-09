"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  nama: string;
  email: string;
  profesi: string;
  jenjang: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

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
        return true;
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        logout();
        return false;
      }
    }
    return false;
  };

  const login = (authToken: string, userData: User) => {
    localStorage.setItem('auth_token', authToken);
    localStorage.setItem('user_data', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
    setIsLoggedIn(true);
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
    logout,
    checkAuth
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

