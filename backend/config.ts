import { config } from "dotenv";

config();

export default {
  port: process.env.SERVER_PORT,
  api_key: process.env.API_KEY,
  database_username: process.env.DATABASE_USERNAME,
  database_password: process.env.DATABASE_PASSWORD,
};
