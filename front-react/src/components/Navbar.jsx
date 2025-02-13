import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
<<<<<<< HEAD
          <Link  to="/principal" className="navbar-brand col-1">
            <img src="src\assets\img\tradz-logo.png" alt="" className="img-fluid"/>
=======
          <Link to="/" className="navbar-brand me-auto">
            Navbar
>>>>>>> 61c30fba29d141925f937e5b3926d9c75e2b3254
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link to="/profile" className="nav-link">
                Perfil
              </Link>
              <Link to="/cart" className="nav-link">
                Carrito 🛒
              </Link>
              <Link to="/principal" className="nav-link">
                Cerrar Sesión
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
