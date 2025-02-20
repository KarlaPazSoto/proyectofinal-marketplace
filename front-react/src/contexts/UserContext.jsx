import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ token: null, email: '' });
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setUser({ token, email });
      fetchProfile(token);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogin = async (email, password) => {
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const token = response.data.token;

      setUser({ token, email });
      fetchProfile(token);

      localStorage.setItem('token', token);
      localStorage.setItem('email', email);

      alert('Ingreso exitoso.');
    } catch (error) {
      console.error('Error en el inicio de sesión.', error.response.data);
      alert('Error en el inicio de sesión.');
    }
  };

  const handleRegister = async (email, password) => {
    if (!email || !password) {
      alert('Email y contraseña son requeridos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });

      const token = response.data.token;

      handleLogin(token, email);

      alert('Registro exitoso.');
    } catch (error) {
      console.error('Error en el registro.', error.response.data);
      alert('Error en el registro.');
    }
  };

  const handleLogout = () => {
    setUser({ token: null, email: '' });
    setProfile(null);

    localStorage.removeItem('token');
    localStorage.removeItem('email');

    alert('Sesión cerrada exitosamente.');
  };

  return (
    <UserContext.Provider value={{ user, profile, handleLogin, handleRegister, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};