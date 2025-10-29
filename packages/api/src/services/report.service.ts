import prisma from '../lib/prisma';
import { WorkType } from '@prisma/client';
import { generatePdf } from './pdf.service';

interface CreateReportData {
  clientName: string;
  projectName: string;
  cableLengthMeters: number;
  workType: 'NUEVA_CONSTRUCCION' | 'REMODELACION';
}

export async function createVLFReport(data: CreateReportData) {
  // 1. Calculate automatic values
  const testVoltageVolts = data.workType === 'NUEVA_CONSTRUCCION' ? 46000 : 35000;

  // 2. Save the report to the database
  const newReport = await prisma.vLFReport.create({
    data: {
      clientName: data.clientName,
      projectName: data.projectName,
      cableLengthMeters: data.cableLengthMeters,
      workType: data.workType,
      testVoltageVolts: testVoltageVolts,
      // Other fields will use their default values from the schema
    },
  });

  // 3. Generate the PDF with the data of the newly created report
  const pdfBuffer = await generatePdf(newReport);

  return { report: newReport, pdf: pdfBuffer };
}
