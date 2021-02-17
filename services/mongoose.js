const mongoose = require('mongoose');
const keys = require('../config/keys');

const {
  MONGODB_DBNAME,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DBURI,
} = keys;

const DBURI = MONGODB_DBURI.replace(
  'MONGODB_USERNAME',
  MONGODB_USERNAME
)
  .replace('MONGODB_PASSWORD', MONGODB_PASSWORD)
  .replace('MONGODB_DBNAME', MONGODB_DBNAME);

mongoose.connect(
  DBURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      return console.error(err);
    }

    console.log(
      '--MONGODB CONNECTED SUCCESSFULLY'
    );
  }
);
