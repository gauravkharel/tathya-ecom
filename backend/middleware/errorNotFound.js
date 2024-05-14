const NotFoundError = require("../helpers/errors/NotFoundError");

const errorNotFound = (req, res, next) => next(new NotFoundError());

module.exports = errorNotFound;
