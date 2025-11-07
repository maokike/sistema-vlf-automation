import { Request, Response } from 'express';
import { createVLFReport } from '../services/report.service';

// Extend Request to include the user property from our middleware
interface AuthRequest extends Request {
  user?: { userId: string };
}

export async function createReport(req: AuthRequest, res: Response) {
  try {
    const { cliente, proyecto, distancia_cable, tipo_construccion } = req.body;

    // Basic validation
    if (!cliente || !proyecto || !distancia_cable || !tipo_construccion) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Call the service to create the report and generate the PDF
    const { report, pdf } = await createVLFReport({
      cliente,
      proyecto,
      distancia_cable,
      tipo_construccion,
    });

    // Set headers to tell the browser it's a PDF file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=dictamen-${report.id}.pdf`);

    // Send the PDF buffer as the response
    res.status(200).end(pdf);

  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
