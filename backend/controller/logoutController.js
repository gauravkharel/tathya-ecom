const process = require("process");
const prisma = require("../lib/db");
require("dotenv").config();
const cookies = require("cookie-parser");

const handleLogout = async ( req, res ) => {
  const {jwt} = req.cookies
  console.log(jwt)
  if (!jwt) return res.sendStatus(204);
  const refreshToken = jwt;

  const foundUser = await prisma.user.findFirst({
    where: {
      refreshToken: {
        token: refreshToken,
      },
    },
  });

  if (!foundUser) {
    res.clearCookies("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  const deleteToken = await prisma.refreshToken.delete({
    where: {
      token: refreshToken
    }
  });

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
