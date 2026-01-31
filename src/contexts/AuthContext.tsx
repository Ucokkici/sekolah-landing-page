import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import authService from '../services/authService';
import { type User, type LoginCredentials, type RegisterData, type ApiResponse, type LoginResponse } from '../types';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<ApiResponse<LoginResponse>>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<ApiResponse<{ user: User }>>;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAsesi: boolean;
  isAsesor: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData.data);
        } catch (error) {
          console.error('Auth check failed:', error);
          authService.logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
    const response = await authService.login(credentials);
    setUser(response.data.user);
    return response;
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setUser(null);
  };

  const register = async (userData: RegisterData): Promise<ApiResponse<{ user: User }>> => {
    return await authService.register(userData);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isAsesi: user?.role === 'asesi',
    isAsesor: user?.role === 'asesor',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};