import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('API for VLF Automation is running!');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
