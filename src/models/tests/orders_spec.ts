import { OrdersClass } from '../orders';

const orders = new OrdersClass();

describe('orders class', () => {
  it('should have index', () => {
    expect(orders.index).toBeDefined();
  });
  it('should have show method', () => {
    expect(orders.show).toBeDefined();
  });
  it('should have create method', () => {
    expect(orders.create).toBeDefined();
  });
  it('should have update method', () => {
    expect(orders.update).toBeDefined();
  });
  it('should have delete method', () => {
    expect(orders.delete).toBeDefined();
  });
  it('should have get current active order', () => {
    expect(orders.currentOrder).toBeDefined();
  });
  it('should have get compeleted orders', () => {
    expect(orders.completedOrders).toBeDefined();
  });

  it('Should get that there is no orders in the db', async () => {
    expect(await orders.index()).toEqual([]);
  });
});
