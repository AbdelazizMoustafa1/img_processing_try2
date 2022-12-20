import express from 'express';

const imageRoute = express.Router();

imageRoute.get( '/', (req,res) => {
    res.json(req.query);
});

export default imageRoute;