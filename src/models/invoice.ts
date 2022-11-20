import Client from '../database';

export type Invoice = {
    id?: number;
    product_id: number;
    orders_id: number;
    quantity: number;
    unit_price : number;
};

export class InvoiceClass {
  async index(): Promise<Invoice[]> {
    try {
      const conn = await Client.connect();
      const query = 'SELECT * FROM INVOICE';

      const invoices = await conn.query(query);

      return invoices.rows;
    } catch (error) {
      throw new Error('Could not get Invoices. Error: ' + error);
    }
  }

  async show(id: number): Promise<Invoice> {
    try {
      const conn = await Client.connect();
      const query = 'SELECT * FROM INVOICE WHERE id = $1';

      const invoices = await conn.query(query, [id]);
      return invoices.rows[0];
    } catch (error) {
      throw new Error('Could not get Invoices. Error: ' + error);
    }
  }

  async showOrderInvoice(orderID: number): Promise<Invoice[]> {
    try {
      const conn = await Client.connect();
      const query =
        'SELECT * FROM INVOICE WHERE ORDERS_ID = $1';

      const invoices = await conn.query(query, [orderID]);
      return invoices.rows[0];
    } catch (error) {
      throw new Error('Could not get Invoices of This Order. Error: ' + error);
    }
  }

  async create(invoices: Invoice): Promise<Invoice> {
    try {
      const conn = await Client.connect();
      const query =
        'INSERT INTO INVOICE (PRODUCT_ID, ORDERS_ID, QUANTITY, UNIT_PRICE) VALUES ($1, $2, $3, $4) RETURNING *';

      const newInvoice = await conn.query(query, [
        invoices.product_id,
        invoices.orders_id,
        invoices.quantity,
        invoices.unit_price
      ]);

      return newInvoice.rows[0];
    } catch (error) {
      throw new Error('Could not create invoice. Error: ' + error);
    }
  }

  async update(id: number, invoices: Invoice): Promise<Invoice> {
    try {
      const conn = await Client.connect();
      const query =
        'UPDATE ORDERS SET PRODUCT_ID = $1, ORDER_ID = $2, QUANTITY = $3, UNIT_PRICE = $4 WHERE id = $5 RETURNING *';

      const newOrder = await conn.query(query, [
        invoices.product_id,
        invoices.orders_id,
        invoices.quantity,
        invoices.unit_price,
        id
      ]);

      return newOrder.rows[0];
    } catch (error) {
      throw new Error('Could not update Invoice. Error: ' + error);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const conn = await Client.connect();
      const query = 'DELETE FROM INVOICE WHERE id = $1';

      const result = await conn.query(query, [id]);
      conn.release();

      return result.rowCount > 0;
    } catch (error) {
      throw new Error('Could not delete Invoice. Error: ' + error);
    }
  }
}
