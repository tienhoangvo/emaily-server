const userRouter = require('express').Router();

userRouter.get('/current-user', (req, res) => {
  res.status(200).json(req.user);
});

module.exports = userRouter;
