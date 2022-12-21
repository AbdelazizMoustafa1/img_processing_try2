import fs from 'fs';
import path from 'path';

// searching for the images directory in our project using recursion 
export const getImagesDir = (dir : string = __dirname) : string => {
    let imagesDir = '';

    const dirContents = fs.readdirSync(dir);

    if (dirContents.includes('images')) {
        imagesDir = path.join(dir, 'images');
        return imagesDir;
    } else {
        if (dirContents.includes('package.json')) {
            console.log(dirContents)
            console.log('images folder not found anywhere from internal upto root folder');
        }
        imagesDir = getImagesDir(path.join(dir,'..'));
        return imagesDir;
    }
}