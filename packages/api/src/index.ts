import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import reportRoutes from './routes/report.routes';

const app = express();
const port = process.env.PORT || 4000; // Render uses port 4000 by default for web services

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
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
