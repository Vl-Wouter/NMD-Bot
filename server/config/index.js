import dotenv from 'dotenv';

dotenv.config();

const config = {
  serverPort: process.env.PORT,
  wit: {
    serverToken: process.env.WIT_SERVER_KEY,
  },
  db: {
    token: process.env.MONGODB_STRING,
  },
  weather: {
    token: process.env.DARKSKY_TOKEN,
  },
  baselocation: {
    lat: 51.087188,
    long: 3.668746,
  },
  fbPageToken: process.env.FB_PAGE_ACCESS_TOKEN,
  fbAppSecret: process.env.FB_APP_SECRET,
  fbVerifyToken: process.env.FB_VALIDATION_TOKEN

};

export default config;
