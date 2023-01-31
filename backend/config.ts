import { config } from 'dotenv';

config();

export default {
  port: process.env.SERVER_PORT
 };