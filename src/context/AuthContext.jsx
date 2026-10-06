import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginApi } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cek sesi saat aplikasi dimuat pertama kali
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (role, nip, password, rememberMe) => {
    try {
      const response = await loginApi(role, nip, password);
      
      setUser(response.user);
      
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', response.token);
      storage.setItem('user', JSON.stringify(response.user));
      
      return { success: true, role: response.user.role };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
