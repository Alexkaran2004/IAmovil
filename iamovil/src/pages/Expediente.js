import React, { useState } from 'react';
import '../styles/expediente.css';

const Expedientes = () => {
  // Datos iniciales de ejemplo
  const [expedientes, setExpedientes] = useState([
    {
      id: 1,
      sucursal: 'Empresa Principal',
      cliente: 'Cliente Uno',
      medioContacto: 'Teléfono',
      trasladado: 'Juan Pérez',
      dniTrasladado: '12345678A',
      telefonoTrasladado: '600111222',
      emailTrasladado: 'clienteuno@example.com',
      tipoServicio: 'Mudanza',
      tipoTransporte: 'Terrestre',
      tipoTrafico: 'Tráfico 1',
      ambito: 'Local',
      tipoMudanza: 'Vivienda',
      fechaPosibleMudanza: '2025-05-10',
      volumen: '23,45',
      peso: '1200',
      visitador: 'Visitador Uno',
      fechaInspeccion: '2025-05-08',
      horaInspeccion: '10:00',
      duracionInspeccion: '60',
      observaciones: 'Observaciones del expediente.',
      foto: 'https://via.placeholder.com/400x300?text=Expediente+1',
      inventario: [
        { nombre: 'Caja Grande', cantidad: 10 },
        { nombre: 'Silla Oficina', cantidad: 5 },
        { nombre: 'Escritorio', cantidad: 2 }
      ]
    },
    {
      id: 2,
      sucursal: 'Sucursal Secundaria',
      cliente: 'Cliente Dos',
      medioContacto: 'Email',
      trasladado: 'María Gómez',
      dniTrasladado: '87654321B',
      telefonoTrasladado: '600333444',
      emailTrasladado: 'clientedos@example.com',
      tipoServicio: 'Mudanza',
      tipoTransporte: 'Terrestre',
      tipoTrafico: 'Tráfico 2',
      ambito: 'Regional',
      tipoMudanza: 'Oficina',
      fechaPosibleMudanza: '2025-06-15',
      volumen: '50,00',
      peso: '2300',
      visitador: 'Visitador Dos',
      fechaInspeccion: '2025-06-10',
      horaInspeccion: '11:30',
      duracionInspeccion: '90',
      observaciones: 'Segunda inspección sin incidencias.',
      foto: 'https://via.placeholder.com/400x300?text=Expediente+2',
      inventario: [
        { nombre: 'Estante', cantidad: 3 },
        { nombre: 'Monitor', cantidad: 7 },
        { nombre: 'Teclado', cantidad: 4 }
      ]
    }
  ]);

  // Estado para el expediente seleccionado en detalle
  const [selectedExpediente, setSelectedExpediente] = useState(null);
  const [selectedInventario, setSelectedInventario] = useState(null);

  // Abre el modal de detalles del expediente
  const openExpedienteModal = (exp) => {
    setSelectedExpediente(exp);
  };

  // Cierra el modal de detalles
  const closeExpedienteModal = () => {
    setSelectedExpediente(null);
  };

  // Abre el modal de inventario
  const openInventarioModal = (exp) => {
    setSelectedInventario(exp.inventario);
  };

  // Cierra el modal de inventario
  const closeInventarioModal = () => {
    setSelectedInventario(null);
  };

  return (
    <div className="expediente-container">
      <h2>Expedientes</h2>
      <table className="expediente-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Sucursal</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {expedientes.map(exp => (
            <tr key={exp.id}>
              <td>{exp.cliente}</td>
              <td>{exp.emailTrasladado}</td>
              <td>{exp.telefonoTrasladado}</td>
              <td>{exp.sucursal}</td>
              <td>
                <button className="btn" onClick={() => openExpedienteModal(exp)}>Ver Detalles</button>
                <button className="btn btn-secondary" onClick={() => openInventarioModal(exp)}>Ver Inventario</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Detalle de Expediente */}
      {selectedExpediente && (
        <div className="modal-overlay" onClick={closeExpedienteModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Detalle del Expediente</h3>
            <table className="detalle-table">
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedExpediente).map(([key, value]) =>
                  typeof value !== 'object' ? (
                    <tr key={key}>
                      <td><strong>{key.replace(/([A-Z])/g, ' $1').trim()}</strong></td>
                      <td>{value}</td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>

            {/* Mostrar la foto, si existe */}
            {selectedExpediente.foto && (
              <div className="detalle-foto">
                <img src={selectedExpediente.foto} alt={`Detalle de ${selectedExpediente.cliente}`} />
              </div>
            )}

            <button className="btn" onClick={closeExpedienteModal}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal de Inventario */}
      {selectedInventario && (
        <div className="modal-overlay" onClick={closeInventarioModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Inventario del Expediente</h3>
            <table className="detalle-table">
              <thead>
                <tr>
                  <th>Nombre del Objeto</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {selectedInventario.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre}</td>
                    <td>{item.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn" onClick={closeInventarioModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expedientes;
