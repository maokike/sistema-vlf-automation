import express from 'express';
import cors from 'cors';
import reportRoutes from './routes/report.routes';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api', reportRoutes);

app.get('/', (req, res) => {
  res.send('API for VLF Report Automation is running!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
