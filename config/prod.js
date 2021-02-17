const prod = {
  PORT: process.env.PORT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET:
    process.env.GOOGLE_CLIENT_SECRET,
  MONGODB_DBNAME: process.env.MONGODB_DBNAME,
  MONGODB_USERNAME: process.env.MONGODB_USERNAME,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_DBURI: process.env.MONGODB_DBURI,
  COOKIE_KEY: process.env.MONGODB_COOKIE_KEY,
};

module.exports = prod;
