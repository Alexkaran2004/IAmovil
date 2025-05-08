import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/App.css'; // Import your CSS file here  

function Navbar() {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">
            <span className="icon">🏠</span> Dashboard
          </Link>
        </li>
        <li className={location.pathname === "/expedientes" ? "active" : ""}>
          <Link to="/expedientes">
            <span className="icon">📂</span> Expedientes
          </Link>
        </li>
        <li className={location.pathname === "/inventarios" ? "active" : ""}>
          <Link to="/inventarios">
            <span className="icon">📦</span> Inventarios
          </Link>
        </li>
        <li className={location.pathname === "/placas" ? "active" : ""}>
          <Link to="/placas">
            <span className="icon">🚗</span> Placas
          </Link>
        </li>
        <li className={location.pathname === "/carga-camion" ? "active" : ""}>
          <Link to="/carga-camion">
            <span className="icon">🚚</span> Carga Camión
          </Link>
        </li>
        <li className={location.pathname === "/configuracion" ? "active" : ""}>
          <Link to="/configuracion">
            <span className="icon">⚙️</span> Configuración
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
