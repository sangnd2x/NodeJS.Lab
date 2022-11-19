module.exports = (req, res, next) => {
  res.json({ csrfToken : req.csrfToken() });
  // next();
}