const prod = {
  PORT: process.env.PORT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET:
    process.env.GOOGLE_CLIENT_SECRET,
  MONGODB_DBNAME: process.env.MONGODB_DBNAME,
  MONGODB_USERNAME: process.env.MONGODB_USERNAME,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_DBURI: process.env.MONGODB_DBURI,
  COOKIE_KEY: process.env.COOKIE_KEY,
  STRIPE_PUBLISHABLE_KEY:
    process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY:
    process.env.STRIPE_SECRET_KEY,
  STRIPE_SUCCESS_URL:
    process.env.STRIPE_SUCCESS_URL,
  STRIPE_CANCEL_URL:
    process.env.STRIPE_CANCEL_URL,
  SENDGRID_KEY: process.env.SENDGRID_KEY,
  SENDGRID_SENDER: process.env.SENDGRID_SENDER,
  REDIRECT_DOMAIN: process.env.REDIRECT_DOMAIN,
};

module.exports = prod;
