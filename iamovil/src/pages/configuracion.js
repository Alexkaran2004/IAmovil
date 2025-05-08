// Configuracion.js
import React, { useState } from 'react';
import '../styles/styles.css';

function Configuracion() {
  const [config, setConfig] = useState({
    contacto: '',
    detallesCarga: '',
    roles: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  const addRole = (role) => {
    setConfig({ ...config, roles: [...config.roles, role] });
  };

  return (
    <div className="configuracion">
      <h2>Configuración</h2>
      <form className="form-configuracion">
        <label>Datos de Contacto:
          <input
            type="text"
            name="contacto"
            value={config.contacto}
            onChange={handleChange}
            placeholder="Nombre y teléfono del contacto"
          />
        </label>
        <label>Detalles de Carga:
          <textarea
            name="detallesCarga"
            value={config.detallesCarga}
            onChange={handleChange}
            placeholder="Información sobre la carga del camión"
          ></textarea>
        </label>
        <button type="button" className="azul" onClick={() => addRole('Operario')}>
          Agregar Rol de Operario
        </button>
        <button type="button" className="naranja" onClick={() => addRole('Administrador')}>
          Agregar Rol de Administrador
        </button>
      </form>

      <h3>Roles Activos</h3>
      <ul>
        {config.roles.map((role, index) => (
          <li key={index}>{role}</li>
        ))}
      </ul>
    </div>
  );
}

export default Configuracion;
