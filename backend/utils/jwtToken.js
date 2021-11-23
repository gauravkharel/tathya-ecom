// generate token and save it in the cookies

const { reset } = require("nodemon");

const sentToken = (user, statusCode, res) => {
  //Create JWT Token
  const token = user.getJwtToken();

  //options for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, //only http can access the cookie
  };

  res.status(statusCode).cookie("token", token, options).json({
    status: "success",
    user,
    token,
  });
};

module.exports = sentToken;
