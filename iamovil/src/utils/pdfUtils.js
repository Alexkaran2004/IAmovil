// pdfUtils.js
import jsPDF from 'jspdf';

export const generarPDF = (data, signature) => {
  const doc = new jsPDF();
  doc.text('Inventario', 10, 10);

  data.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.nombre} - Cantidad: ${item.cantidad}`, 10, 20 + index * 10);
  });

  if (signature) {
    const img = new Image();
    img.src = signature;
    doc.addImage(img, 'PNG', 10, 30 + data.length * 10, 60, 30);
  }

  doc.save('inventario.pdf');
};
