import fs from 'fs';
import path from 'path';
import { Response,Request, NextFunction } from 'express';
import { getImagesDir } from '../utils/utils';

const imagesDir = getImagesDir();
const imagesNames = fs.readdirSync(imagesDir).filter((item) => !(fs.lstatSync(path.join(imagesDir, item)).isDirectory())).map((item) => item.replace('.jpg',''));
// console.log(imagesNames);
// check if the image filename is already given
export const imageExists = (req : Request, res: Response, next : NextFunction): void => {
 const {filename} = req.query;

 if (imagesNames.includes(filename as string)){
    res.json({message: 'thanks for filename'});
    next();
 } else {
    res.status(400).send(`please choose a filename and make sure it's from here {${imagesNames}}and add it without .jpg `);
 }
};

//check height or width if given to resize
export const validateDimentions = (req : Request, res: Response, next : NextFunction): void => {
    const {height, width} = req.query;
    let corrupted = false;

    if (height) {
        res.json({message: 'thanks for height'});
        const heightNum = parseInt(height as string);
        if (heightNum <= 0) {
            res.status(400).send(`Error: height <= 0`);
            corrupted = true;
        }
    }
    if (width && !corrupted) {
        res.json({message: 'thanks for width'});
        const widthNum = parseInt(width as string);
        if (widthNum <= 0) {
            res.status(400).send(`Error: width <= 0`);
            corrupted = true;
        } else {
            // resize
            res.json({message: 'thanks for correct width'});        }
            next();
    }
    if (!corrupted) {
        next();
    }
   };
   