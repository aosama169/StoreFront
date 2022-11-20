import Client from '../database';

export type Orders = {
  id?: number;
  user_id: number;
  order_status: boolean;
};

export class OrdersClass {
  async index(): Promise<Orders[]> {
    try {
      const conn = await Client.connect();
      const query = 'SELECT * FROM ORDERS';

      const orders = await conn.query(query);

      return orders.rows;
    } catch (error) {
      throw new Error('Could not get Orders. Error: ' + error);
    }
  }

  async show(id: number): Promise<Orders> {
    try {
      const conn = await Client.connect();
      const query = 'SELECT * FROM ORDERS WHERE id = $1';

      const order = await conn.query(query, [id]);
      return order.rows[0];
    } catch (error) {
      throw new Error('Could not get Order. Error: ' + error);
    }
  }

  async currentOrder(user_id: number): Promise<Orders> {
    try {
      const conn = await Client.connect();
      const query =
        'SELECT * FROM ORDERS WHERE USER_ID = $1 AND ORDER_STATUS = 0 LIMIT 1';

      const order = await conn.query(query, [user_id]);
      return order.rows[0];
    } catch (error) {
      throw new Error('Could not get Order. Error: ' + error);
    }
  }

  async completedOrders(user_id: number): Promise<Orders[]> {
    try {
      const conn = await Client.connect();
      const query =
        'SELECT * FROM ORDERS WHERE USER_ID = $1 AND ORDER_STATUS = 1';

      const order = await conn.query(query, [user_id]);
      return order.rows;
    } catch (error) {
      throw new Error('Could not get Order. Error: ' + error);
    }
  }
  
  async orderStatus(order_id: number): Promise<string> {
    try {
      const conn = await Client.connect();
      const query =
        'SELECT (CASE WHEN order_status = FALSE THEN \'ACTIVE\' ELSE \'COMPLETED\' END) AS order_status  FROM ORDERS WHERE ID = $1';

      const order = await conn.query(query, [order_id]);
      return order.rows[0].order_status;
    } catch (error) {
      throw new Error('Could not get Order. Error: ' + error);
    }
  }
  
  async create(order: Orders): Promise<Orders> {
    try {
      const conn = await Client.connect();
      const query =
        'INSERT INTO ORDERS (USER_ID, ORDER_STATUS) VALUES ($1, $2) RETURNING *';

      const newOrder = await conn.query(query, [
        order.user_id,
        order.order_status
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
        'UPDATE ORDERS SET USER_ID = $1, ORDER_STATUS = $2 WHERE id = $3 RETURNING *';

      const newOrder = await conn.query(query, [
        order.user_id,
        order.order_status
      ]);

      return newOrder.rows[0];
    } catch (error) {
      throw new Error('Could not update Order. Error: ' + error);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const conn = await Client.connect();
      const query = 'DELETE FROM ORDERS WHERE id = $1';

      const result = await conn.query(query, [id]);
      conn.release();

      return result.rowCount > 0;
    } catch (error) {
      throw new Error('Could not delete Order. Error: ' + error);
    }
  }
}
