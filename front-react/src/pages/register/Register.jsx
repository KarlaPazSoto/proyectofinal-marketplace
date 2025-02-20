import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Register = () => {
  const { handleRegister } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    await handleRegister(email, password);
    navigate('/login');
  };

  return (
    <div className="container col-4">
      <h2>Registrarse</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            aria-label="email"
            aria-describedby="basic-addon1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            aria-label="contraseña"
            aria-describedby="basic-addon1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirmar contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirmar contraseña"
            aria-label="confirmar contraseña"
            aria-describedby="basic-addon1"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column text-center">
          <button type="submit" className="btn btn-primary">Registrarme</button>
          <p>¿Ya tienes cuenta? <Link to='/login'>Inicia sesión</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;