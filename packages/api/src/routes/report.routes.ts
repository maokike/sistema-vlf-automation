import { Router } from 'express';
import { createReport } from '../controllers/report.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// This will be the main endpoint for generating reports, now protected
router.post('/', authenticateToken, createReport);

export default router;
