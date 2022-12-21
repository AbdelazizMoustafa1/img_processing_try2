import express from 'express';
import fs from 'fs';
import path from 'path';
import { imageExists,validateDimentions } from '../../middlewares/quiriesValidation';

const imageRoute = express.Router();
imageRoute.use([imageExists, validateDimentions]);

const imagePath = path.join('..','..','images');
imageRoute.get( '/', (req,res) => {
    res.json(req.query);
});

export default imageRoute;