import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="container col-4">
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre"
          aria-label="nombre"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          aria-label="email"
          aria-describedby="basic-addon1"
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
        />
      </div>
      <div className="d-flex flex-column text-center">
      <button type="submit" class="btn btn-primary">Registrarme</button>
      <p>¿Ya tienes cuenta? <Link to='/login'>Inicia sesión</Link></p>
      </div>
    </div>
  );
};

export default Register;
