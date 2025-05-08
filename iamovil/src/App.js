import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar.js';
import Dashboard from './components/Dashboard';
import Expedientes from './pages/Expediente.js';
import Inventarios from './pages/inventarios.js';
import Placas from './pages/placas.js';
import Configuracion from './pages/configuracion.js';
import CargaCamion from './pages/CargaCamion.js';  // ✅ Nueva opción
import '../src/styles/styles.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expedientes" element={<Expedientes />} />
            <Route path="/inventarios" element={<Inventarios />} />
            <Route path="/placas" element={<Placas />} />
            <Route path="/carga-camion" element={<CargaCamion />} />  {/* ✅ Nueva ruta */}
            <Route path="/configuracion" element={<Configuracion />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
