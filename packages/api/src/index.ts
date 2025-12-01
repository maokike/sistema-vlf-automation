import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import reportRoutes from './routes/report.routes';

const app = express();
const port = process.env.PORT || 4000; // Render uses port 4000 by default for web services

// Middlewares
const allowedOrigins = [
  'http://localhost:3000', // For local development
  'https://sistema-vlf-automation-web.vercel.app', // Your Vercel frontend URL
];

import { CorsOptions } from 'cors';

// ... (other code)

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON bodies

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

// Health check route
app.get('/', (req, res) => {
  res.status(200).send('API for VLF Automation is running!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
