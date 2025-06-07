const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load env vars

const SECRET_KEY = process.env.JWT_SECRET;

function generateToken(payload, expiresIn = '1h') {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken
};
