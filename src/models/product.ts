import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class ProductClass {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const query = 'SELECT * FROM products';

      const result = await conn.query(query);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error('Could not get Products. Error: ${error}');
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const query = 'SELECT * FROM products WHERE id = $1';

      const result = await conn.query(query, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error('Could not get Products. Error: ${error}');
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const query =
        'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';

      const result = await conn.query(query, [
        product.name,
        product.price,
        product.category
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error('Could not create Products. Error: ${error}');
    }
  }

  async update(id: number, product: Product): Promise<Product> {
    try {
      const conn = await Client.connect();

      const query =
        'UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *';

      const result = await conn.query(query, [
        product.name,
        product.price,
        product.category,
        id
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error('Could not update Products. Error: ${error}');
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const conn = await Client.connect();

      const query = 'DELETE FROM products WHERE id = $1';
      const result = await conn.query(query, [id]);

      conn.release();

      return result.rowCount > 0;
    } catch (error) {
      throw new Error('Could not delete Products. Error: ${error}');
    }
  }
}
