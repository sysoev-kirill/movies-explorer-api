const { ERROR_VALIDATE } = require('./constantsError');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_VALIDATE;
  }
}

module.exports = ValidationError;
