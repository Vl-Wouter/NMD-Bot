import dotenv from 'dotenv';

dotenv.config();

const config = {
  serverPort: process.env.PORT,
  wit: {
    serverToken: process.env.WIT_SERVER_KEY,
  },
  db: {
    token: process.env.MONGODB_STRING,
  }
};

export default config;
