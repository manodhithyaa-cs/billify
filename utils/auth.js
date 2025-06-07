const { verifyToken } = require('./encryption');

function authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect('/');

  const decoded = verifyToken(token);
  if (!decoded) return res.redirect('/');

  req.user = decoded;
  next();
}

module.exports = { authenticate };
