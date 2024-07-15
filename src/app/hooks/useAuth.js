// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/api/auth/check'); // Endpoint to validate token
      } catch (error) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    };

    checkAuth();
  }, []);

  return null;
};

export default useAuth;
