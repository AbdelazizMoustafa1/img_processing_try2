import fs from 'fs';
import path from 'path';
import { Response, Request, NextFunction } from 'express';
import { getImagesDir } from '../utils/utils';

const imagesDir = getImagesDir();

const imgsNames = fs
  .readdirSync(imagesDir)
  .filter((item) => !fs.lstatSync(path.join(imagesDir, item)).isDirectory())
  .map((item) => item.replace('.jpg', ''));

// check if the image filename is already given
export const imgExists = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { filename } = req.query;
  console.log('\n--------------\nrestaring over');

  if (imgsNames.includes(filename as string)) {
    next();
  } else {
    console.log('\nfilename isnt okay or not there');
    res
      .status(400)
      .send(
        `please choose a filename and make sure it's from here {${imgsNames}}and add it without .jpg `
      );
  }
};

//check the input height or width for resizing
export const validateDimentions = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { height, width } = req.query;
  console.log(`H=${height} W=${width}`);
  let err = false;

  if (height) {
    const heightNum = parseInt(height as string);
    if (heightNum <= 0 || isNaN(heightNum)) {
      console.log('height isnt okay');
      res.status(400).send(`Error: height <= 0 or Nan`);
      err = true;
    }
  }
  if (width && !err) {
    const widthNum = parseInt(width as string);
    if (widthNum <= 0 || isNaN(widthNum)) {
      console.log('width isnt okay');
      res.status(400).send(`Error: width <= 0 or Nan`);
      err = true;
    }
  }
  if (!err) {
    console.log('everything and (optional H &/or W) passed');
    next();
  }
};
