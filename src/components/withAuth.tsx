'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { User } from '@/types';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          router.replace('/admin/login');
          return;
        }

        try {
          // You might need a dedicated endpoint to get the current user's profile
          const response = await api.get('/auth/me'); 
          const user: User = response.data;

          if (user.role === 'admin') {
            setIsAdmin(true);
          } else {
            localStorage.removeItem('token');
            router.replace('/admin/login');
          }
        } catch (error) {
          localStorage.removeItem('token');
          router.replace('/admin/login');
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>; // Or a spinner component
    }

    if (!isAdmin) {
      return null; // Or a "Not Authorized" component
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
