const jwt = require('jsonwebtoken');
const AuthError = require("../error/unauthError");
const UnauthError = require('../error/unauthError');

const { NODE_ENV, JWT_SECRET } = process.env;

const isAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = isAuth;
