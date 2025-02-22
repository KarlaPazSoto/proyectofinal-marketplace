import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Register = () => {
  const { handleRegister } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    await handleRegister(email, password, nombre, telefono, direccion, tipoUsuario);
    navigate('/login');
  };

  return (
    <div className="container col-4 mt-5 mb-5">
      <h2 className='mb-5'>Registrarse</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ej: Juan Perez"
            aria-label="nombre"
            aria-describedby="basic-addon1"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Ej: juanperez@gmail.com"
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
            placeholder="**********"
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
            placeholder="**********"
            aria-label="confirmar contraseña"
            aria-describedby="basic-addon1"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ej: 1234567890"
            aria-label="telefono"
            aria-describedby="basic-addon1"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ej: Calle Falsa 123"
            aria-label="direccion"
            aria-describedby="basic-addon1"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>
        {/* <div className="mb-3">
          <label className="form-label">Tipo de Usuario</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ej: Cliente"
            aria-label="tipo_usuario"
            aria-describedby="basic-addon1"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
          />
        </div> */}
        <div className="d-flex flex-column text-center">
          <button type="submit" className="btn btn-primary">Registrarme</button>
          <p>¿Ya tienes cuenta? <Link to='/login'>Inicia sesión</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;