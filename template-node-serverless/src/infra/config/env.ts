import * as dotenv from 'dotenv';

dotenv.config();

export default {
  server_port: process.env.PORT,
  db_host: process.env.DB_HOST,
  db_port: Number(process.env.DB_PORT),
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
};
