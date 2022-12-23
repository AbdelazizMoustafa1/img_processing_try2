import fs from 'fs';
import path from 'path';
import supertest from 'supertest';
import app from '..';
import { cacheDirCreation, getImagesDir } from '../utils/utils';

const request = supertest(app);
const imgsDir = getImagesDir();
const cacheDir = path.join(imgsDir, 'cache');

describe('Test endpoint responses', (): void => {
  beforeAll((): void => {
    console.log('before all');
    cacheDirCreation();
  });
  beforeEach((): void => {
    console.log('before each');
    // remove all files in the cache Directory
    for (const file of fs.readdirSync(cacheDir)) {
      fs.unlinkSync(path.join(cacheDir, file));
      console.log(`removed recently created file: ${file}`);
    }
  });
  afterEach((): void => {
    console.log('after each');
  });
  afterAll((): void => {
    console.log('after all');
    console.log('remove cach directory');
    if (fs.existsSync(cacheDir)) {
      fs.rmdirSync(cacheDir, { recursive: true });
    }
  });
  it('tests endpoint with /', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe(
      '{"message":"To start, please add /api/images?filename=filenae&<optional>height=10&<optional>width=20 to the address bar"}'
    );
  });
  it('tests endpoint with wrong url', async (): Promise<void> => {
    const response = await request.get('/api/deadLink');
    expect(response.status).toBe(404);
  });
  it('tests endpoint with no filename', async (): Promise<void> => {
    const response = await request.get('/api/images?');
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      "please choose a filename and make sure it's from here {encenadaport,fjord,icelandwaterfall,palmtunnel,santamonica}and add it without .jpg"
    );
  });
  it('tests endpoint with invalid filename', async (): Promise<void> => {
    const response = await request
      .get('/api/images')
      .query({ filename: 'notthere' });
    expect(response.status).toBe(400);
  });
  it('tests endpoint with valid filename', async (): Promise<void> => {
    const response = await request.get('/api/images?filename=fjord');
    expect(response.status).toBe(200);
  });
  it('tests endpoint with valid arguments', async (): Promise<void> => {
    const response = await request.get(
      '/api/images?filename=fjord&height=400&width=600'
    );
    expect(response.status).toBe(200);
  });
  it('tests endpoint with invalid arguments', async (): Promise<void> => {
    const response = await request.get(
      '/api/images?filename=fjord&height=invalid&width=invalid'
    );
    expect(response.status).toBe(400);
  });
});
