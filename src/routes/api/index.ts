import express from 'express';
import imagesRoute from './images';

const apiRoute = express.Router();

apiRoute.use('/images', imagesRoute);

apiRoute.get('/', (_req, res)=>{
    res.json({message : 'To start, add /api/images?filename=filenae&<optional>height=10&<optional>width=20 to the address bar'});
})

export default apiRoute;