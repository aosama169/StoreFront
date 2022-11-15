import Client from '../database';

export type Orders = {
  id?: number;
  productID: number;
  quantity: number;
  userId: number;
  orderStatus: boolean;
};

export class OrdersClass {
  async index(): Promise<Orders[]> {
    try {
      const conn = await Client.connect();
      const query = 'SELECT * FROM orders';

      const orders = await conn.query(query);

      return orders.rows;
    } catch (error) {
      throw new Error('Could not get Orders. Error: ' + error);
    }
  }

  async show(id: number): Promise<Orders> {
    try {
      const conn = await Client.connect();
      const query = 'SELECT * FROM orders WHERE id = $1';

      const order = await conn.query(query, [id]);
      return order.rows[0];
    } catch (error) {
      throw new Error('Could not get Order. Error: ' + error);
    }
  }

  async currentOrder(userId: number): Promise<Orders> {
    try {
      const conn = await Client.connect();
      const query =
        'SELECT * FROM orders WHERE USER_ID = $1 AND ORDER_STATUS = 0 LIMIT 1';

      const order = await conn.query(query, [userId]);
      return order.rows[0];
    } catch (error) {
      throw new Error('Could not get Order. Error: ' + error);
    }
  }

  async completedOrders(userId: number): Promise<Orders> {
    try {
      const conn = await Client.connect();
      const query =
        'SELECT * FROM orders WHERE USER_ID = $1 AND ORDER_STATUS = 1';

      const order = await conn.query(query, [userId]);
      return order.rows[0];
    } catch (error) {
      throw new Error('Could not get Order. Error: ' + error);
    }
  }

  async create(order: Orders): Promise<Orders> {
    try {
      const conn = await Client.connect();
      const query =
        'INSERT INTO orders (productID, quantity, userId, orderStatus) VALUES ($1, $2, $3, $4) RETURNING *';

      const newOrder = await conn.query(query, [
        order.productID,
        order.quantity,
        order.userId,
        order.orderStatus
      ]);

      return newOrder.rows[0];
    } catch (error) {
      throw new Error('Could not create Order. Error: ' + error);
    }
  }

  async update(id: number, order: Orders): Promise<Orders> {
    try {
      const conn = await Client.connect();
      const query =
        'UPDATE orders SET productID = $1, quantity = $2, userId nWHERE id = $3 RETURNING *';

      const newOrder = await conn.query(query, [
        order.productID,
        order.quantity,
        order.userId
      ]);

      return newOrder.rows[0];
    } catch (error) {
      throw new Error('Could not update Order. Error: ' + error);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const conn = await Client.connect();
      const query = 'DELETE FROM orders WHERE id = $1';

      const result = await conn.query(query, [id]);
      conn.release();

      return result.rowCount > 0;
    } catch (error) {
      throw new Error('Could not delete Order. Error: ' + error);
    }
  }
}
