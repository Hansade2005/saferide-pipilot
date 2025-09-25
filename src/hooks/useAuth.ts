import { useState, useEffect } from 'react';
import { User, AuthError } from '@/types';
import api from '@/services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, phone: string) => Promise<void>;
 logout: () => void;
 error: AuthError | null;
  loading: boolean;
}

const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await api.auth.login(email, password);
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      setError({
        code: 'auth/login-error',
        message: err instanceof Error ? err.message : 'Login failed'
      });
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, phone: string) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await api.auth.signup(email, password, name, phone);
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      setError({
        code: 'auth/signup-error',
        message: err instanceof Error ? err.message : 'Signup failed'
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    error,
    loading
  };
};

export default useAuth;