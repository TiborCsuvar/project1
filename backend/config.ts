import { config } from "dotenv";

config();

export default {
  port: process.env.SERVER_PORT,
  api_key: process.env.API_KEY,
};
