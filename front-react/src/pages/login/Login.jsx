import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Login = () => {
  const { handleLogin } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
    navigate('/');
  };

  return (
    <div className='container col-4'>
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='d-flex flex-column text-center'>
          <button className="btn btn-primary" type="submit">
            Iniciar sesión
          </button>
          <p>¿No tienes cuenta? <Link to='/register'>Regístrate</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;