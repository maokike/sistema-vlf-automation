import { Router } from 'express';
import { createReport } from '../controllers/report.controller';

const router = Router();

// This will be the main endpoint for generating reports
router.post('/reports', createReport);

export default router;
