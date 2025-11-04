import { Request, Response } from 'express';
import { createVLFReport } from '../services/report.service';

// Extend Request to include the user property from our middleware
interface AuthRequest extends Request {
  user?: { userId: string };
}

export async function createReport(req: AuthRequest, res: Response) {
  try {
    // The user ID is now available from the authenticated request
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID is missing' });
    }

    const { clientName, projectName, cableLengthMeters, workType } = req.body;

    // Basic validation
    if (!clientName || !projectName || !cableLengthMeters || !workType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Call the service to create the report and generate the PDF, now with userId
    const { report, pdf } = await createVLFReport({
      clientName,
      projectName,
      cableLengthMeters,
      workType,
      userId,
    });

    // Set headers to tell the browser it's a PDF file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=dictamen-${report.id}.pdf`);

    // Send the PDF buffer as the response
    res.status(200).send(pdf);

  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
