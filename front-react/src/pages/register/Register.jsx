import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';

const Register = () => {
  const navigate = useNavigate();
  const { setProfile } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    telefono: '',
    direccion: '',
    tipo_usuario: 'comprador' // o vendedor
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.register(formData);
      if (response.token) {
        const profile = await authService.getProfile();
        setProfile(profile);
        navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error en el registro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container col-4 mt-5">
      <h2>Registro</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            className="form-control"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            className="form-control"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo de Usuario</label>
          <select
            name="tipo_usuario"
            className="form-control"
            value={formData.tipo_usuario}
            onChange={handleChange}
            required
          >
            <option value="comprador">Comprador</option>
            <option value="vendedor">Vendedor</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};

export default Register;