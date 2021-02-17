const express = require('express');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');
require('./services/mongoose');
require('./services/passport');

const authRouter = require('./routes/authRoutes');
const passport = require('passport');

const app = express();

if (keys.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [keys.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

const PORT = keys.PORT;

app.listen(PORT, () => {
  console.log(
    `--EXPRESS APP IS LISTENING ON PORT ${PORT}`
  );
});
