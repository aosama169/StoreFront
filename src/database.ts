import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { DBHOST, DBNAME, DBUSER, DBPASSWORD, DBNAMETEST, ENV } = process.env;

let Client: Pool;

console.log("I'm Working on the " + ENV + ' Database!');

if (ENV === 'test') {
  Client = new Pool({
    host: DBHOST,
    database: DBNAME,
    user: DBUSER,
    password: DBPASSWORD
  });
} else {
  Client = new Pool({
    host: DBHOST,
    database: DBNAMETEST,
    user: DBUSER,
    password: DBPASSWORD
  });
}

export default Client;
