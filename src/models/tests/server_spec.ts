import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('Try opening main Endpoint ', () => {
  it('should return a status code 200', async () => {
    const response = await request.get('/image');
    expect(response.statusCode).toBe(200);
  });
});

describe('Get All Available Products', () => {
  it('should return a status code 200', async () => {
    const response = await request.get('/products');
    await expect(response.statusCode).toBe(200);
  });
});

describe('Get All Available Orders', () => {
  it('should return a status code 200', async () => {
    const response = await request.get('/orders');
    await expect(response.statusCode).toBe(200);
  });
});
