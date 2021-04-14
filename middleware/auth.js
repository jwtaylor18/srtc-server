const jwt = require('jsonwebtoken');
const config = require('config');
require('dotenv').config()

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {

    // const decoded = jwt.verify(token, config.get('jwtSecret'))
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded.user;
    next()
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(401).json({ msg: 'token is not valid' });
  }
};