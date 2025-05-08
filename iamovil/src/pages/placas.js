import React, { useState } from 'react';
// Importa QRCodeCanvas desde 'qrcode.react' (asegúrate de haber instalado la librería con "npm install qrcode.react")
import { QRCodeCanvas } from 'qrcode.react';
import '../styles/placas.css';

function Placas() {
  const [placas, setPlacas] = useState([]);
  const [nuevaPlaca, setNuevaPlaca] = useState({
    fecha: '',
    lugar: '',
    observaciones: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaPlaca({ ...nuevaPlaca, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación: se requieren fecha y lugar
    if (!nuevaPlaca.fecha || !nuevaPlaca.lugar) {
      setError('La fecha y el lugar son obligatorios.');
      return;
    }
    setPlacas([...placas, nuevaPlaca]);
    setNuevaPlaca({ fecha: '', lugar: '', observaciones: '' });
    setError('');
  };

  return (
    <div className="placas">
      <h2>Placas de Aparcamiento</h2>
      <form onSubmit={handleSubmit} className="form-placas">
        <fieldset>
          <legend>Datos de la Placa</legend>
          <div className="form-group">
            <label htmlFor="fecha">Fecha:</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={nuevaPlaca.fecha}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lugar">Lugar:</label>
            <input
              type="text"
              id="lugar"
              name="lugar"
              value={nuevaPlaca.lugar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="observaciones">Observaciones:</label>
            <textarea
              id="observaciones"
              name="observaciones"
              value={nuevaPlaca.observaciones}
              onChange={handleChange}
            ></textarea>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="azul">
            Agregar Placa
          </button>
        </fieldset>
      </form>

      <h3>Lista de Placas</h3>
      {placas.length === 0 ? (
        <p>No hay placas registradas.</p>
      ) : (
        <table className="placas-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Lugar</th>
              <th>Observaciones</th>
              <th>QR</th>
            </tr>
          </thead>
          <tbody>
            {placas.map((placa, index) => (
              <tr key={index}>
                <td>{placa.fecha}</td>
                <td>{placa.lugar}</td>
                <td>{placa.observaciones}</td>
                <td>
                  <QRCodeCanvas
                    value={`Fecha: ${placa.fecha} - Lugar: ${placa.lugar} - Observaciones: ${placa.observaciones}`}
                    size={64}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Placas;
