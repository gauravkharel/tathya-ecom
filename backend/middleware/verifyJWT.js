const jwt = require("jsonwebtoken");
const prisma = require("../lib/db");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.email = decoded.email;

    const findUser = await prisma.user.findUnique({
      where: {
        email: req.email,
      },
    });

    if (!findUser) {
      return res.sendStatus(404);
    }
    
    req.userId = findUser.id;
    next();
  } catch (err) {
    console.error(err);
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.sendStatus(403)
    }
    res.sendStatus(500)
  }
};

module.exports = verifyJWT;
