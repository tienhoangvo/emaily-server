if (process.env.NODE_ENV === 'production') {
  // PRODUCTION MODE
  module.exports = require('./prod');
} else {
  // DEVELOPMENT MODE
  module.exports = require('./dev');
}
