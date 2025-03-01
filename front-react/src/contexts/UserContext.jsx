import { createContext, useState, useEffect } from "react";
import { authService } from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchProfile();
    } else {
      localStorage.removeItem('token');
    }
  }, [token]); // Se ejecuta cuando cambia el token

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
      setToken(response.token); // Almacena el token en el estado
      alert('Ingreso exitoso.');
      return response;
    } catch (error) {
      console.error('Error en login:', error);
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
    localStorage.clear(); // Limpia todos los datos de localStorage
    alert('Sesión cerrada exitosamente.');
  };

  return (
    <UserContext.Provider value={{ 
      profile,
      user: profile, // Alias de profile
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
