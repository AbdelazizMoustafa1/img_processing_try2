import fs from 'fs';
import path from 'path';
import supertest from 'supertest';
import app from '..';
import { getImagesDir } from '../utils/utils';

const request = supertest(app);
const imgsDir = getImagesDir();
const cachePath = path.join(imgsDir,'cache');

describe ("Test endpoint responses", () => {
    beforeEach( () => {
        console.log('before each');
    });
    beforeAll( () => {
        console.log('before all');
        if (fs.existsSync(cachePath)) {
            fs.rmdirSync(cachePath,{recursive:true})
        }
    });
    afterEach( () => {
        console.log('after each');
    });
    afterAll( () => {
        console.log('after each');
    });
    it('tests endpoint with no filename', async () => {
        const response = await request.get('/image');
        expect(response.status).toBe(400);
    });
    it('tests endpoint with invalid filename', async () => {
        const response = await request.get('/image').query({filename: 'notthere'});
        expect(response.status).toBe(404);
    });

})