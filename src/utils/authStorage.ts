import { User } from '../types/auth';

export const getStoredUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    return userData;
  } catch (error) {
    console.error('Failed to parse stored user data:', error);
    return null;
  }
};

export const storeUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearUserData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};