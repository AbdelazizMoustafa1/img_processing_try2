import express from 'express';
import imagesRoute from './images';

const apiRoute = express.Router();

apiRoute.use('/images', imagesRoute);

apiRoute.get('/', (_req, res)=>{
    res.json({message : 'use api/images?filename={file} with optional height and width'});
})

export default apiRoute;