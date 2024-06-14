const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  api_base_url: process.env.API_BASE_URL,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  dbAppName: process.env.DB_APP_NAME,
  awsAccessKey: process.env.S3_ACCESS_KEY,
  awsSecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
};
