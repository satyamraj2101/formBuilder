import React, { useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { User } from '../types/auth';
import { loginOrRegister } from '../api/formApi';
import { getStoredUser, storeUser, clearUserData } from '../utils/authStorage';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await getStoredUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to restore auth state:', error);
        clearUserData();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string) => {
    try {
      const userData = await loginOrRegister(email);
      setUser(userData);
      storeUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    clearUserData();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}