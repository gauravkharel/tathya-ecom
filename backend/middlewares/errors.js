const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      errStack: err.stack,
    });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    // Mongoose Invalid Product ID Error : CastError Handling
    if (err.name === "CastError") {
        const message = `Resource Not Found: Invalid ${err.path}: ${err.value}.`;
        error = new ErrorHandler(message, 400);
    }
    
    // Mongoose ValidationError Handling
    if (err.name === "ValidationError") {
        const message = Object.values(err.error).map((value) => value.message);
        error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      messsage: err.message || "Server Error",
    });
  }
};
