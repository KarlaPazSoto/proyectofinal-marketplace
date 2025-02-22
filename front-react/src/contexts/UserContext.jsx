import React, { createContext, useState } from 'react';
import { authService } from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      // Usar el servicio de autenticación para login
      const response = await authService.login({ email, password });
      
      // Si el login es exitoso, obtener el perfil
      if (response.token) {
        const userProfile = await authService.getProfile();
        setProfile(userProfile);
      }
      
      return response;
    } catch (error) {
      console.error('Error en login:', error);
      console.error('Detalles:', {
        mensaje: error.message,
        respuesta: error.response?.data,
        estado: error.response?.status
      });
      throw error;
    }
  };

  const handleLogout = () => {
    authService.logout();
    setProfile(null);
  };

  return (
    <UserContext.Provider value={{ profile, setProfile, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};