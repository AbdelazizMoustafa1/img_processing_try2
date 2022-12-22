import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// searching for the images directory in our project using recursion
export const getImagesDir = (dir: string = __dirname): string => {
  let imagesDir = '';

  const dirContents = fs.readdirSync(dir);

  if (dirContents.includes('images')) {
    imagesDir = path.join(dir, 'images');
    return imagesDir;
  } else {
    if (dirContents.includes('package.json')) {
      console.log(dirContents);
      console.log(
        'images folder not found anywhere from internal upto root folder'
      );
      throw new Error('The images folder is not present');
    }
    imagesDir = getImagesDir(path.join(dir, '..'));
    return imagesDir;
  }
};

const imgsDir = getImagesDir();

// resize function
const resizeWorH = async (
  inP: string,
  outP: string,
  height?: number,
  width?: number
): Promise<void> => {
  if (height && width) {
    await sharp(inP).resize({ height, width }).toFile(outP);
  } else if (height) {
    await sharp(inP).resize({ height }).toFile(outP);
  } else if (width) {
    await sharp(inP).resize({ width }).toFile(outP);
  }
};

// create cached directory once when requested if not there
const cacheDirCreation = (): void => {
  const cachePath = path.join(imgsDir, 'cache');
  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath);
  }
};

// using the image file with resizing
export const getImage = async (
  queries: Record<string, unknown>
): Promise<string> => {
  const { filename, height, width } = queries;
  const heightNum = parseInt(height as string);
  const widthNum = parseInt(width as string);
  const originalPath = path.join(imgsDir, filename + '.jpg');

  if (!(width || height)) {
    console.log('no resizing requested, directly return the image');
    return originalPath;
  } else {
    cacheDirCreation();
    const imgPath = path.join(
      imgsDir,
      'cache',
      filename + `_H${height}_W${width}.jpg`
    );

    if (fs.existsSync(imgPath)) {
      console.log('no need to resize as it was cached');
      return imgPath;
    } else {
      if (height && width) {
        console.log('resizing H and W');
        await resizeWorH(originalPath, imgPath, heightNum, widthNum);
      } else if (height) {
        console.log('resizing H only');
        await resizeWorH(originalPath, imgPath, heightNum, undefined);
      } else if (width) {
        console.log('resizing W only');
        await resizeWorH(originalPath, imgPath, undefined, widthNum);
      }
      return imgPath;
    }
  }
};
