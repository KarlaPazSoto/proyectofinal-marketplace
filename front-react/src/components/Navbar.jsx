import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/img/logo-horizontal.png";
import Search from "./Search";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-navbar flex-column">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Contenedor móvil */}
          <div className="d-flex d-lg-none w-100 justify-content-between align-items-center">
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
            
            <Link to="/" className="navbar-brand m-0">
              <img src={logo} alt="logo" className="logo-navbar" style={{ height: '40px' }} />
            </Link>
          </div>

          {/* Contenedor desktop */}
          <div className="d-none d-lg-flex w-100 justify-content-between align-items-center">
            <Link to="/" className="navbar-brand" style={{ width: '20%' }}>
              <img src={logo} alt="logo" className="logo-navbar ms-4" />
            </Link>
            
            <div className="mx-auto" style={{ width: '50%' }}>
              <Search />
            </div>
          </div>

          {/* Menú desplegable */}
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{ width: '25%' }}>
            <div className="navbar-nav">
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

        {/* Barra de búsqueda móvil */}
        <div className="container-fluid d-lg-none mt-2">
          <Search />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
