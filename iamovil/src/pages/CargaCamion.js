import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import SignatureCanvas from 'react-signature-canvas';
import '../styles/cargaCamion.css';

function CargaCamion() {
  // Estado del login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // Datos simulados de expedientes asignados
  const [expedientes] = useState([
    {
      id: 1,
      cliente: "Juan Pérez",
      origen: "Madrid",
      destino: "Barcelona",
      ceas: "CEA-001",
      expediente: "EXP-1001",
      asignado: true
    },
    {
      id: 2,
      cliente: "María Gómez",
      origen: "Sevilla",
      destino: "Valencia",
      ceas: "CEA-002",
      expediente: "EXP-1002",
      asignado: true
    },
  ]);
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null);
  const [mostrarNuevoInventario, setMostrarNuevoInventario] = useState(false);
  const [mostrarFinalizacion, setMostrarFinalizacion] = useState(false);

  // Estado para múltiples objetos de inventario
  const [inventarioItems, setInventarioItems] = useState([
    { nombre: "", caracteristicas: "", foto: null }
  ]);

  // Refs para capturar las firmas
  const operarioFirmaRef = useRef(null);
  const clienteFirmaRef = useRef(null);

  // Manejador del login (simulado)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes implementar validación real
    setIsLoggedIn(true);
  };

  // Inicia el flujo de "Nuevo Inventario" asignando un expediente y reiniciando los objetos
  const handleNuevoInventario = (exp) => {
    setExpedienteSeleccionado(exp);
    setInventarioItems([{ nombre: "", caracteristicas: "", foto: null }]);
    setMostrarNuevoInventario(true);
  };

  // Actualiza el campo de un objeto en inventario
  const handleItemChange = (index, field, value) => {
    const newItems = [...inventarioItems];
    newItems[index][field] = value;
    setInventarioItems(newItems);
  };

  // Maneja la carga de foto para un objeto
  const handleItemPhotoChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItems = [...inventarioItems];
        newItems[index].foto = reader.result;
        setInventarioItems(newItems);
      };
      reader.readAsDataURL(file);
    }
  };

  // Agrega un nuevo objeto vacío al inventario
  const handleAddItem = () => {
    setInventarioItems([...inventarioItems, { nombre: "", caracteristicas: "", foto: null }]);
  };

  // Elimina un objeto, solo si hay al menos dos
  const handleRemoveItem = (index) => {
    if (inventarioItems.length > 1) {
      setInventarioItems(inventarioItems.filter((_, i) => i !== index));
    }
  };

  // Verifica que cada objeto tenga sus datos obligatorios y pasa a la etapa de firma
  const handleEnviarInventario = () => {
    for (let i = 0; i < inventarioItems.length; i++) {
      if (inventarioItems[i].nombre.trim() === "" || inventarioItems[i].caracteristicas.trim() === "") {
        alert(`Completa todos los campos para el objeto ${i + 1}.`);
        return;
      }
    }
    setMostrarNuevoInventario(false);
    setMostrarFinalizacion(true);
  };

  // Genera el PDF con los detalles de inventario, fotos y las firmas
  const finalizarInventario = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text(`Inventario para Expediente: ${expedienteSeleccionado.expediente}`, 20, 20);
    pdf.setFontSize(12);
    let currentY = 30;
    inventarioItems.forEach((item, index) => {
      pdf.text(`Objeto ${index + 1}:`, 20, currentY);
      currentY += 5;
      pdf.text(`Nombre: ${item.nombre}`, 20, currentY);
      currentY += 5;
      pdf.text(`Características: ${item.caracteristicas}`, 20, currentY);
      currentY += 10;
      if (item.foto) {
        pdf.text("Foto del Objeto:", 20, currentY);
        currentY += 5;
        pdf.addImage(item.foto, "PNG", 20, currentY, 60, 40);
        currentY += 45;
      } else {
        currentY += 10;
      }
    });
    pdf.text("Firma Operario:", 20, currentY);
    if (operarioFirmaRef.current && !operarioFirmaRef.current.isEmpty()) {
      const operarioSignatureData = operarioFirmaRef.current.toDataURL("image/png");
      pdf.addImage(operarioSignatureData, "PNG", 20, currentY + 5, 60, 30);
    }
    currentY += 50;
    pdf.text("Firma Cliente:", 100, currentY);
    if (clienteFirmaRef.current && !clienteFirmaRef.current.isEmpty()) {
      const clienteSignatureData = clienteFirmaRef.current.toDataURL("image/png");
      pdf.addImage(clienteSignatureData, "PNG", 100, currentY + 5, 60, 30);
    }
    pdf.save(`Inventario_${expedienteSeleccionado.expediente}.pdf`);
    alert(`Inventario enviado para el expediente ${expedienteSeleccionado.expediente}`);
    setMostrarFinalizacion(false);
  };

  // Si el operario no está logueado, muestra el formulario de login
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>Login Operario</h2>
        <form onSubmit={handleLoginSubmit} className="login-form card">
          <input
            type="text"
            placeholder="Usuario"
            value={loginForm.username}
            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            required
          />
          <button className="btn" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    );
  }

  // Contenido principal para el operario (después del login)
  return (
    <div className="expediente-container">
      <h2>Carga Camión - Expedientes Asignados</h2>
      {/* Vista principal: Tabla de expedientes asignados */}
      {!mostrarNuevoInventario && !mostrarFinalizacion && (
        <table className="expediente-tabla">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>CEA</th>
              <th>Expediente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {expedientes.filter((exp) => exp.asignado).map((exp) => (
              <tr key={exp.id}>
                <td>{exp.cliente}</td>
                <td>{exp.origen}</td>
                <td>{exp.destino}</td>
                <td>{exp.ceas}</td>
                <td>{exp.expediente}</td>
                <td>
                  <button className="btn" onClick={() => alert("Inventario de carga actualizado")}>
                    Cargar Inventario
                  </button>
                  <button className="btn" onClick={() => handleNuevoInventario(exp)}>
                    Nuevo Inventario
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Formulario para Nuevo Inventario con opción para agregar múltiples objetos */}
      {mostrarNuevoInventario && expedienteSeleccionado && (
        <div className="inventario-form card">
          <h3>Nuevo Inventario para {expedienteSeleccionado.expediente}</h3>
          {inventarioItems.map((item, index) => (
            <div key={index} className="inventory-item">
              <h4>Objeto {index + 1}</h4>
              <input
                type="text"
                placeholder="Nombre del Objeto"
                value={item.nombre}
                onChange={(e) => handleItemChange(index, 'nombre', e.target.value)}
              />
              <textarea
                placeholder="Características"
                value={item.caracteristicas}
                onChange={(e) => handleItemChange(index, 'caracteristicas', e.target.value)}
              />
              <div className="foto-upload">
                <label>Foto del Objeto:</label>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => handleItemPhotoChange(e, index)}
                />
                {item.foto && (
                  <img
                    src={item.foto}
                    alt="Preview"
                    className="foto-preview"
                    style={{ width: '100%', marginTop: '10px', borderRadius: '4px' }}
                  />
                )}
              </div>
              {inventarioItems.length > 1 && (
                <button className="btn" onClick={() => handleRemoveItem(index)}>
                  Eliminar Objeto
                </button>
              )}
            </div>
          ))}
          <div className="add-object-container">
            <button className="btn add-object" onClick={handleAddItem}>
              <span className="icon">➕</span> Agregar Objeto
            </button>
          </div>
          <div className="action-buttons">
            <button className="btn" onClick={handleEnviarInventario}>Enviar Inventario</button>
            <button className="btn" onClick={() => setMostrarNuevoInventario(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Pantalla de finalización: formulario para la firma */}
      {mostrarFinalizacion && (
        <div className="finalizacion-form card">
          <h3>Finalizar Inventario - Firma</h3>
          <p>Por favor, firme a continuación:</p>
          <div className="firma-container">
            <p>Firma Operario:</p>
            <SignatureCanvas ref={operarioFirmaRef} canvasProps={{ className: 'firma-canvas' }} />
            <button className="btn" onClick={() => operarioFirmaRef.current.clear()}>
              Limpiar Firma
            </button>
          </div>
          <div className="firma-container">
            <p>Firma Cliente:</p>
            <SignatureCanvas ref={clienteFirmaRef} canvasProps={{ className: 'firma-canvas' }} />
            <button className="btn" onClick={() => clienteFirmaRef.current.clear()}>
              Limpiar Firma
            </button>
          </div>
          <button className="btn" onClick={finalizarInventario}>
            Generar PDF y Enviar Inventario
          </button>
          <button className="btn" onClick={() => setMostrarFinalizacion(false)}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default CargaCamion;
