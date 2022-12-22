import express from 'express';
import {
  imgExists,
  validateDimentions
} from '../../middlewares/quiriesValidation';
import { getImage } from '../../utils/utils';

const imgDispRoute = express.Router();
imgDispRoute.use([imgExists, validateDimentions]);

imgDispRoute.get('/', async (req, res) => {
  const imgP = await getImage(req.query);
  res.sendFile(imgP);
});

export default imgDispRoute;
