const { Router } = require('express');
const passport = require('passport');

const authRouter = Router();

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/',
  })
);

authRouter.get('/api/logout', (req, res) => {
  req.logout();
  res.status(200).json(req.user);
});

authRouter.get(
  '/api/current_user',
  (req, res) => {
    console.log('********cookies', req.session);
    res.status(200).json(req.user);
  }
);

module.exports = authRouter;
