import fs from 'fs';
import path from 'path';
import supertest from 'supertest';
import app from '..';
import { getImagesDir } from '../utils/utils';

const request = supertest(app);
const imgsDir = getImagesDir();
const cachePath = path.join(imgsDir, 'cache');

describe('Test endpoint responses', (): void => {
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
  it('tests endpoint with /', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe(
      '{"message":"To start, please add /api/images?filename=filenae&<optional>height=10&<optional>width=20 to the address bar"}'
    );
  });
  it('tests endpoint with no filename', async (): Promise<void> => {
    const response = await request.get('/api/image');
    expect(response.status).toBe(404);
  });
  it('tests endpoint with invalid filename', async (): Promise<void> => {
    const response = await request
      .get('/api/image')
      .query({ filename: 'notthere' });
    expect(response.status).toBe(404);
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
});
