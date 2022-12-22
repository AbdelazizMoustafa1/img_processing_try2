import fs from 'fs';
import path from 'path';
import supertest from 'supertest';
import app from '..';
import { getImagesDir } from '../utils/utils';

const request = supertest(app);
const imgsDir = getImagesDir();
const cachePath = path.join(imgsDir, 'cache');

describe('Image processing and caching', (): void => {
  beforeEach(() => {
    console.log('before each');
  });
  beforeAll(() => {
    console.log('before all');
    if (fs.existsSync(cachePath)) {
      fs.rmdirSync(cachePath, { recursive: true });
    }
  });
  afterEach(() => {
    console.log('after each');
  });
  afterAll(() => {
    console.log('after all');
  });
  it('tests getImagesDir', async (): Promise<void> => {
    const response = await fs.existsSync(imgsDir);
    expect(response).toBe(true);
  });
  it('tests getImagesDir', async (): Promise<void> => {
    const fileTest = await request.get(
      '/api/images?filename=fjord&height=400&width=600'
    );
    console.log(fileTest);
    const response = fs.existsSync(cachePath);
    expect(response).toBe(true);
  });
});
