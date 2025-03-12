"use client";

import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf";
import { useRef } from "react";

interface QRCodePDFProps {
  qrValue: string;
}

export default function QRCodePDF({ qrValue }: QRCodePDFProps) {
  const qrRef = useRef<HTMLCanvasElement>(null);

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.text("Escanea el código QR para acceder a la carta:", 20, 20);

    const canvas = qrRef.current;
    if (canvas) {
      const qrDataUrl = canvas.toDataURL("image/png");
      pdf.addImage(qrDataUrl, "PNG", 60, 40, 90, 90);
      pdf.save("qr-carta.pdf");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Generar QR en pantalla */}
      <QRCodeCanvas value={qrValue} size={150} ref={qrRef} />

      {/* Botón para descargar el PDF */}
      <button
        onClick={generatePDF}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Descargar QR en PDF
      </button>
    </div>
  );
}
