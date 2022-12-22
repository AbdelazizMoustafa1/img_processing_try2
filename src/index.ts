import express from 'express';
import apiRoute from './routes/api';

const port = 3000;

const app = express();

app.use('/api', apiRoute);

app.get('/', (_req, res) => {
  res.json({
    message:
      'To start, please add /api/images?filename=filenae&<optional>height=10&<optional>width=20 to the address bar'
  });
});

app.listen(port, () => {
  console.log(`image processing and listeneiong on port ${port}`);
});

export default app;
