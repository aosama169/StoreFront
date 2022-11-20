import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: string;
  category?: string;
};

export class ProductClass {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const query = 'SELECT * FROM product';

      const result = await conn.query(query);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error('Could not get product. Error: ' + error);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const query = 'SELECT * FROM PRODUCT WHERE id = $1';

      const result = await conn.query(query, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error('Could not get product. Error: ' + error);
    }
  }

  async topFive(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const query =
        'SELECT P.ID, P.NAME, P.PRICE, P.CATEGORY, count(*) as counts ' +
        'FROM INVOICE O' +
        'INNER JOIN PRODUCT P ON P.ID = O.PRODUCT_ID' +
        'group by P.ID' +
        'order by counts DESC, NAME ASC' +
        'LIMIT 5';

      const result = await conn.query(query);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error('Could not get product. Error: ' + error);
    }
  }

  async showCat(category: string): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const query = 'SELECT * FROM PRODUCT WHERE CATEGORY  = $1';

      const result = await conn.query(query, [category]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error('Could not get product. Error: ' + error);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const query =
        'INSERT INTO PRODUCT (name, price, category) VALUES ($1, $2, $3) RETURNING *';

      const result = await conn.query(query, [
        product.name,
        product.price,
        product.category
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error('Could not create PRODUCT. Error: ' + error);
    }
  }

  async update(id: number, product: Product): Promise<Product> {
    try {
      const conn = await Client.connect();

      const query =
        'UPDATE PRODUCT SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *';

      const result = await conn.query(query, [
        product.name,
        product.price,
        product.category,
        id
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error('Could not update PRODUCT. Error: ' + error);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const conn = await Client.connect();

      const query = 'DELETE FROM PRODUCT WHERE id = $1';
      const result = await conn.query(query, [id]);

      conn.release();

      return result.rowCount > 0;
    } catch (error) {
      throw new Error('Could not delete PRODUCT. Error: ' + error);
    }
  }
}
