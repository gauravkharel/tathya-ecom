const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  //gets the header from request
  const authHeader = req.headers.authorization || req.headers.Authorization;
  //for roles change upper code to
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  // save the token
  const token = authHeader.split(' ')[1];
  //verify it
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token
        req.email= decoded.email;
        next();
    }
);
  
};

module.exports = verifyJWT;
