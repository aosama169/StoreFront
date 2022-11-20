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

describe('Create User, Login and take a test cycle', () => {
let token: string;
let userId: number;
let productId: number;
let orderId: number;
  it('Create a new user', async () => {

    const Response = await request.post('/users')
    .send({first_name: 'Ahmed', last_name: 'Osama', email: 'ahmed@example.com', password : 'password'});
    expect(Response.body.token).toBeDefined;
  });

  it("Try To Login", async () => {
    const response = await request.post('/auth')
    .send({email : 'ahmed@example.com', password : 'password'});

    expect(response.body.token).toBeDefined();
    token = response.body.token;
    userId = response.body.id;
  });

  
  it("Try To Create Product", async () => {
    const response = await request.post('/products')
    .send({name : 'product1', price : 10.00, category : 'test'})
    .set('token' , token);

    expect(response.statusCode).toBe(200);
    productId = response.body.id;
  });
  
  it("Try To Create new order", async () => {
    const response = await request.post('/orders')
    .send({user_id : userId, order_status : false})
    .set('token' , token);

    expect(response.statusCode).toBe(200);
    orderId = response.body.id;
  });

  it("Add the product to the order", async () => {
    const response = await request.post('/invoices')
    .send({product_id: productId, orders_id: orderId, quantity: 1, unit_price : 10.00})
    .set('token' , token);

    expect(response.statusCode).toBe(200);
  });


  it("Try To Delete the user fails caused by having saved order", async () => {
    const response = await request.delete('/users/'+ userId)
    .set('token' , token);
    expect(response.body).toThrowError;

  });

});