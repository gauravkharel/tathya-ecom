const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

//user authentication middleware
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  //check if the user is authenticated
  if (!req.user) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  //verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

//Handling user roles
exports.authorizedRoles = (...roles) => {
  return(req, res, next) => {
    if(roles.inclused(req.user.role)){
      return next(
          new ErrorHandler(`Role (${req.user.role}) probhitted from the resource access`, 403)
      )
    }
    next()
  }
}

