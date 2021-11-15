//class for error handling

class ErrorHandler extends Error {
  constructor(message, errorCode) {
    super(message);
    this.statusCode = errorCode;

    Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;
