import React from "react";
import "../../styles/colores.css";
import { Link } from "react-router-dom";

const Principal = () => {
  return (
    <div>
      <div className="container-fluid row">
        <div className="col text-center">
          <h1>Hola Rosi</h1>
          <p>esta es la pagina principal</p>
        </div>
        <div className="col d-flex flex-column justify-content-evenly align-items-center">
          <Link to='/login'>
            <button className="btn btn-primary" type="button">
                boton pa iniciar sesión
            </button>
          </Link>
          <Link to='/register'>
          <button className="btn btn-primary" type="button">
            boton pa registrarse
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Principal;
