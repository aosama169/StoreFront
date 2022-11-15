import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export type Users = {
  id?: number;
  first_name: string;
  last_name: string;
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
      throw new Error('Could not get Users. Error: ' + error);
    }
  }

  async show(id: number): Promise<Users> {
    try {
      const conn = await Client.connect();

      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await conn.query(query, [id]);
      conn.release();
      const _user = result.rows[0];
      delete _user.password;
      return _user;
    } catch (error) {
      throw new Error('Could not get Users. Error: ' + error);
    }
  }

  async create(user: Users): Promise<Users> {
    try {
      const conn = await Client.connect();
      const query =
        'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';

      const hashedPassword = bcrypt.hashSync(
        ((user.password as string) + process.env.BCRYPT_PASS) as string,
        parseInt(process.env.BCRYPT_SALT as string)
      );

      const result = await conn.query(query, [
        user.first_name,
        user.last_name,
        user.email,
        hashedPassword
      ]);

      conn.release();

      const _user = result.rows[0];
      delete _user.password;
      return _user;
    } catch (error) {
      throw new Error('Could not create Users. Error: ' + error);
    }
  }

  async update(id: number, user: Users): Promise<Users> {
    try {
      const conn = await Client.connect();

      const query =
        'UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5 RETURNING *';
      const hashedPassword = bcrypt.hashSync(
        ((user.password as string) + process.env.BCRYPT_PASS) as string,
        parseInt(process.env.BCRYPT_SALT as string)
      );

      const result = await conn.query(query, [
        user.first_name,
        user.last_name,
        user.email,
        hashedPassword,
        id
      ]);

      conn.release();

      const _user = result.rows[0];
      delete _user.password;
      return _user;
    } catch (error) {
      throw new Error('Could not update Users. Error: ' + error);
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
      throw new Error('Could not delete Users. Error: ' + error);
    }
  }

  async Authenticate(email: string, password: string): Promise<Users> {
    try {
      const conn = await Client.connect();

      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await conn.query(query, [email]);
      conn.release();

      if (result.rows.length > 0) {
        const _user = result.rows[0];

        if (
          bcrypt.compareSync(
            (password as string) + process.env.BCRYPT_PASS,
            _user.password
          )
        ) {
          //logged in .
          delete _user.password;
          return _user;
        } else {
          throw new Error('Wrong password');
        }
      } else {
        throw new Error('Wrong User Email');
      }
    } catch (error) {
      throw new Error('Could not authenticate Users. Error: ' + error);
    }
  }
}
