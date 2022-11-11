import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export type Users = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  token?: string;
};

dotenv.config();

export class UsersClass {
  async index(): Promise<Users[]> {
    try {
      const conn = await Client.connect();
      const query = 'SELECT * FROM users';

      const result = await conn.query(query);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error('Could not get Users. Error: ${error}');
    }
  }

  async show(id: number): Promise<Users> {
    try {
      const conn = await Client.connect();

      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await conn.query(query, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error('Could not get Users. Error: ${error}');
    }
  }

  async create(user: Users): Promise<Users> {
    try {
      const conn = await Client.connect();
      const query =
        'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *';

      const hashedPassword = bcrypt.hashSync(
        ((user.password as string) + process.env.BCRYPT_PASS) as string,
        parseInt(process.env.BCRYPT_SALT as string)
      );

      const result = await conn.query(query, [
        user.firstName,
        user.lastName,
        user.email,
        hashedPassword
      ]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('Could not create Users. Error: ${error}');
    }
  }

  async update(id: number, user: Users): Promise<Users> {
    try {
      const conn = await Client.connect();

      const query =
        'UPDATE users SET firstName = $1, lastName = $2, email = $3, password = $4 WHERE id = $5 RETURNING *';
      const hashedPassword = bcrypt.hashSync(
        ((user.password as string) + process.env.BCRYPT_PASS) as string,
        parseInt(process.env.BCRYPT_SALT as string)
      );

      const result = await conn.query(query, [
        user.firstName,
        user.lastName,
        user.email,
        hashedPassword,
        id
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error('Could not update Users. Error: ${error}');
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const conn = await Client.connect();
      const query = 'DELETE FROM users WHERE id = $1';

      const result = await conn.query(query, [id]);

      conn.release();

      return result.rowCount > 0;
    } catch (error) {
      throw new Error('Could not delete Users. Error: ${error}');
    }
  }

  async Authenticate(email: string, password: string): Promise<string> {
    try {
      const conn = await Client.connect();

      const query = 'SELECT password FROM users WHERE email = $1';
      const result = await conn.query(query, [email]);
      conn.release();

      if (result.rows.length > 0) {
        const hashedPassword = bcrypt.hashSync(
          ((password as string) + process.env.BCRYPT_PASS) as string,
          parseInt(process.env.BCRYPT_SALT as string)
        );

        if (result.rows[0].password === hashedPassword) {
          return 'logged in';
        } else {
          return 'Wrong password';
        }
      } else {
        return 'Wrong User Email';
      }
    } catch (error) {
      throw new Error('Could not authenticate Users. Error: ${error}');
    }
  }
}
