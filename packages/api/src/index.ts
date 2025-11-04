import express from 'express';
import cors from 'cors';
import reportRoutes from './routes/report.routes';
import authRoutes from './routes/auth.routes';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API for VLF Report Automation is running!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
