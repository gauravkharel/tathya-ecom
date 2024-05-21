const prisma = require("../lib/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const cookieToken = cookies.jwt;
  const foundToken = await prisma.refreshToken.findUnique({
    where: { token: cookieToken },
    select: {
      user: true,
    },
  });

  if (!foundToken) return res.sendStatus(403);
  // evaluate jwt
  jwt.verify(cookieToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundToken.user.email !== decoded.email)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      { email: decoded.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: Math.floor(Date.now() / 1000) + 30 * 60 }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
