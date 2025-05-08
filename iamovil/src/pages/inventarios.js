import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { jsPDF } from 'jspdf';
import '../styles/styles.css';

function Inventarios() {
  const [inventario, setInventario] = useState({
    nombreProducto: '',
    codigo: '',
    cantidad: '',
    peso: '',
    dimensiones: '',
    almacenOrigen: '',
    almacenDestino: '',
    estadoProducto: '',
    observaciones: '',
  });

  const operarioFirmaRef = useRef(null);
  const clienteFirmaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventario({ ...inventario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Inventario registrado exitosamente.");
  };

  const limpiarFirma = (ref) => {
    ref.current.clear();
  };

  const generarPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(16);
    pdf.text("Gestión de Inventario", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Nombre del Producto: ${inventario.nombreProducto}`, 20, 40);
    pdf.text(`Código: ${inventario.codigo}`, 20, 50);
    pdf.text(`Cantidad: ${inventario.cantidad}`, 20, 60);
    pdf.text(`Peso: ${inventario.peso}`, 20, 70);
    pdf.text(`Dimensiones: ${inventario.dimensiones}`, 20, 80);
    pdf.text(`Almacén de Origen: ${inventario.almacenOrigen}`, 20, 90);
    pdf.text(`Almacén de Destino: ${inventario.almacenDestino}`, 20, 100);
    pdf.text(`Estado del Producto: ${inventario.estadoProducto}`, 20, 110);
    pdf.text(`Observaciones: ${inventario.observaciones}`, 20, 120);

    // ✅ "Firma Operario" y "Firma Cliente" aparecen correctamente **encima** de la firma con espacio
    if (operarioFirmaRef.current && !operarioFirmaRef.current.isEmpty()) {
      pdf.text("Firma Operario", 20, 125); // **Texto colocado arriba de la firma**
      const operarioFirmaData = operarioFirmaRef.current.toDataURL("image/png");
      pdf.addImage(operarioFirmaData, "PNG", 20, 130, 60, 30);
    }

    if (clienteFirmaRef.current && !clienteFirmaRef.current.isEmpty()) {
      pdf.text("Firma Cliente", 100, 125); // **Texto colocado arriba de la firma**
      const clienteFirmaData = clienteFirmaRef.current.toDataURL("image/png");
      pdf.addImage(clienteFirmaData, "PNG", 100, 130, 60, 30);
    }

    pdf.save("Inventario.pdf");
  };

  return (
    <div className="inventario-container">
      <h2>Gestión de Inventario</h2>

      <form className="inventario-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-group">
            <label>Nombre del Producto</label>
            <input type="text" name="nombreProducto" value={inventario.nombreProducto} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Código</label>
            <input type="text" name="codigo" value={inventario.codigo} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label>Cantidad</label>
            <input type="number" name="cantidad" value={inventario.cantidad} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Peso</label>
            <input type="text" name="peso" value={inventario.peso} onChange={handleChange} />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label>Dimensiones</label>
            <input type="text" name="dimensiones" value={inventario.dimensiones} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Estado del Producto</label>
            <select name="estadoProducto" value={inventario.estadoProducto} onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Usado">Usado</option>
              <option value="Dañado">Dañado</option>
            </select>
          </div>
        </div>

        {/* Área de firmas con texto arriba y botón dentro */}
        <div className="form-section">
          <div className="firma-container">
            <label>Firma Operario</label>
            <SignatureCanvas ref={operarioFirmaRef} canvasProps={{ className: 'firma-canvas' }} />
            <button type="button" className="limpiar-btn" onClick={() => limpiarFirma(operarioFirmaRef)}>Limpiar</button>
          </div>
          <div className="firma-container">
            <label>Firma Cliente</label>
            <SignatureCanvas ref={clienteFirmaRef} canvasProps={{ className: 'firma-canvas' }} />
            <button type="button" className="limpiar-btn" onClick={() => limpiarFirma(clienteFirmaRef)}>Limpiar</button>
          </div>
        </div>

        <button type="submit" className="guardar">Guardar Inventario</button>
        <button type="button" className="pdf" onClick={generarPDF}>Generar PDF</button>
      </form>
    </div>
  );
}

export default Inventarios;
