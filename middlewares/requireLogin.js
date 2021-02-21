const requireLoggedIn = (req, res, next) => {
  console.log(req);
  if (req.isAuthenticated()) return next();

  res
    .status(401)
    .json({ error: 'You must log in!' });
};

module.exports = requireLoggedIn;
