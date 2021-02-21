const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
require('./services/mongoose');
require('./services/passport');

const authRouter = require('./routes/authRoutes');

const userRouter = require('./routes/userRoutes');
const billingRouter = require('./routes/billingRoutes');

const app = express();

if (keys.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [keys.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

const path = require('path');

app.use('/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/billings', billingRouter);

if (process.env.NODE_ENV === 'production') {
  //Serve up production assets .js .css files
  app.use(
    express.static(
      path.join(__dirname, 'client/build')
    )
  );

  // Serve the index.html file
  app.all('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        'client',
        'build',
        'index.html'
      )
    );
  });
}

const PORT = keys.PORT;

app.listen(PORT, () => {
  console.log(
    `--EXPRESS APP IS LISTENING ON PORT ${PORT}`
  );
});
