const process = require("process");
const prisma = require("../lib/db");
require("dotenv").config();
const cookies = require("cookie-parser");

const handleLogout = async ( req, res ) => {
  const cookies = req.cookies
  console.log(cookies.jwt)
  if (!cookies.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await prisma.user.findFirst({
    where: {
      refreshToken: {
        token: refreshToken,
      },
    },
  });
  console.log('foundUser')

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
