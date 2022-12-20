import express from 'express';
import apiRoute from './routes/api';

const port = 3000;

const app = express();
app.use(express.json());
app.use('/api', apiRoute);

app.get('/',(_req, res) => {
  res.json({message: 'use api/images?filename={file} with optional height and width'});
});

app.listen(port, () => {
  console.log(`listeneiong on port ${port}`);
});

export default app;