import { createContext, useState, useEffect } from "react";
import { authService } from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const userProfile = await authService.getProfile();
      setProfile(userProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      handleLogout();
    }
  };

  const handleLogin = async (email, password) => {
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const response = await authService.login({ email, password });
      setToken(response.token);
      await fetchProfile();
      alert('Ingreso exitoso.');
      return response;
    } catch (error) {
      console.error('Error en login:', error);
      console.error('Detalles:', {
        mensaje: error.message,
        respuesta: error.response?.data,
        estado: error.response?.status
      });
      alert('Error en el inicio de sesión.');
      throw error;
    }
  };

  const handleRegister = async (email, password, nombre, telefono, direccion, tipo_usuario) => {
    if (!email || !password || !nombre || !telefono || !direccion || !tipo_usuario) {
      alert('Todos los campos son requeridos.');
      return;
    }

    try {
      const response = await authService.register({
        email,
        password,
        nombre,
        telefono,
        direccion,
        tipo_usuario
      });

      alert('Registro exitoso.');
      return response;
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro.');
      throw error;
    }
  };

  const handleLogout = () => {
    setProfile(null);
    setToken(null);
    authService.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    alert('Sesión cerrada exitosamente.');
  };

  return (
    <UserContext.Provider value={{ 
      profile,
      user: profile, // Mantener user como alias de profile
      setProfile, 
      token,
      handleLogin, 
      handleRegister,
      handleLogout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;