import prisma from '../lib/prisma';
import { generatePdf } from './pdf.service';

interface CreateReportData {
  cliente: string;
  proyecto: string;
  distancia_cable: number;
  // These are now auto-calculated or pre-defined
  // marca_cable: string;
  // resistencia: number;
  tipo_construccion: 'NUEVA_CONSTRUCCION' | 'REMODELACION';
}

export async function createVLFReport(data: CreateReportData) {
  // 1. Calculate automatic values
  const voltaje = data.tipo_construccion === 'NUEVA_CONSTRUCCION' ? 46000 : 35000;

  // Placeholder values for automatic data
  const resistencia = Math.random() * 10; // Placeholder
  const marca_cable = 'MARCA_EJEMPLO'; // Placeholder
  const punto_prueba = 'Subestación Principal - Interconexión Edificio B'; // Placeholder

  // 2. Save the report to the database
  const newReport = await prisma.vlfReport.create({
    data: {
      cliente: data.cliente,
      proyecto: data.proyecto,
      distancia_cable: data.distancia_cable,
      voltaje: voltaje,
      resistencia: resistencia,
      marca_cable: marca_cable,
      punto_prueba: punto_prueba,
    },
  });

  // 3. Generate the PDF with the data of the newly created report
  const pdfBuffer = await generatePdf(newReport);

  return { report: newReport, pdf: pdfBuffer };
}
