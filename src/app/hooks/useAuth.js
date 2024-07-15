// src/hooks/useAuth.js
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // Only run the effect on the client side
    if (typeof window === 'undefined') return;

    const checkAuth = async () => {
      try {
        await axios.get('/api/auth/check'); // Endpoint to validate token
      } catch (error) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    };

    checkAuth();
  }, [router]);

  return null;
};

export default useAuth;
