import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/img/logo-horizontal.png";
import Search from "./Search";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="logo" className="logo-navbar ms-4" />
          </Link>
          
          
          <div className="d-none d-lg-block" style={{ width: '40%' }}>
            <Search />
          </div>
          

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
            {/* Barra de búsqueda - solo visible en móvil */}
            <div className="d-lg-none w-100 my-2">
              <Search />
            </div>
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
