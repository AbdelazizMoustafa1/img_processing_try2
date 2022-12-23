import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import supertest from 'supertest';
import app from '..';
import { cacheDirCreation, getImagesDir, resizeWorH } from '../utils/utils';

const request = supertest(app);
const imgsDir = getImagesDir();
const cacheDir = path.join(imgsDir, 'cache');

describe('Image processing and caching', (): void => {
  beforeAll((): void => {
    console.log('before all');
    cacheDirCreation();
  });
  beforeEach((): void => {
    console.log('before each');
    // remove all files in the cache Directory
    for (const file of fs.readdirSync(cacheDir)) {
      fs.unlinkSync(path.join(cacheDir, file));
      console.log(`removed file: ${file}`);
    }
  });
  afterEach((): void => {
    console.log('after each');
  });
  afterAll((): void => {
    console.log('after all');
    // remove cache directory
    if (fs.existsSync(cacheDir)) {
      fs.rmdirSync(cacheDir, { recursive: true });
      console.log('removed cache directory');
    }
  });
  it('checks Images Directory presence', async (): Promise<void> => {
    const response = fs.existsSync(imgsDir);
    expect(response).toBe(true);
  });
  it('tests creating cache file by resizing function with resizing parameters', async (): Promise<void> => {
    const inP = path.join(imgsDir, 'fjord.jpg');
    const fileP = path.join(cacheDir, 'fjord_H500_W200.jpg');
    await resizeWorH(inP, fileP, 500, 200);
    const response: boolean = fs.existsSync(fileP);
    const metData = await sharp(fileP).metadata();
    expect(response).toBe(true);
    expect(metData.height).toBe(500);
    expect(metData.width).toBe(200);
  });
  it('checks resizing with only 1 parameter', async (): Promise<void> => {
    const inP = path.join(imgsDir, 'fjord.jpg');
    const fileP = path.join(cacheDir, 'fjord_H100_Wundefined.jpg');
    await resizeWorH(inP, fileP, 100);
    const response: boolean = fs.existsSync(fileP);
    const metData = await sharp(fileP).metadata();
    expect(response).toBe(true);
    expect(metData.height).toBe(100);
  });
  it('tests creating cache directory after calling api with resizing parameters', async (): Promise<void> => {
    await request.get('/api/images?filename=fjord&height=400&width=600');
    const response: boolean = fs.existsSync(cacheDir);
    expect(response).toBe(true);
  });
  it('tests creating cache file after calling api with resizing parameters', async (): Promise<void> => {
    await request.get('/api/images?filename=fjord&height=400&width=600');
    const fileP = path.join(cacheDir, 'fjord_H400_W600.jpg');
    const response: boolean = fs.existsSync(fileP);
    expect(response).toBe(true);
  });
  it('tests creating cache file after calling api with only 1 resizing parameter', async (): Promise<void> => {
    await request.get('/api/images?filename=fjord&height=400');
    const fileP = path.join(cacheDir, 'fjord_H400_Wundefined.jpg');
    const response: boolean = fs.existsSync(fileP);
    expect(response).toBe(true);
  });
});
