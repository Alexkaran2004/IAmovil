// SignaturePad.js
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import '../styles/styles.css';

function SignaturePad({ onSave }) {
  const sigCanvas = useRef(null);

  const clearSignature = () => sigCanvas.current.clear();
  const saveSignature = () => {
    const signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    onSave(signature);
  };

  return (
    <div className="signature-pad">
      <h3>Firma:</h3>
      <SignatureCanvas ref={sigCanvas} penColor="black" canvasProps={{ width: 300, height: 200, className: 'sigCanvas' }} />
      <button onClick={clearSignature} className="rojo">Limpiar</button>
      <button onClick={saveSignature} className="azul">Guardar Firma</button>
    </div>
  );
}

export default SignaturePad;
