const requireCredits = (req, res, next) => {
  if (req.user.credits < 1)
    return res
      .status(403)
      .json({ error: 'Not enough credits' });
  next();
};

module.exports = requireCredits;
