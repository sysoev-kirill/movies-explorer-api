const { ERROR_UNAUTH } = require('./constantsError');

class UnauthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNAUTH;
  }
}

module.exports = UnauthError;
