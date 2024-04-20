const prisma = require("../lib/db");
const { createHmac } = require("node:crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email)
    return res.status(400).json({ message: "Email address is required." });

  if (!password)
    return res.status(400).json({ message: "Password is required." });

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!findUser) {
    return res
      .status(404)
      .json("User not found. Please try again with valid email.");
  }
  const userSalt = findUser.salt;
  const userHashPassword = createHmac("sha256", userSalt)
    .update(password)
    .digest("hex");

  if (userHashPassword !== findUser.password) {
    return res
      .status(400)
      .json("Password is Invalid. Please enter correct password.");
  }
  if (userHashPassword == findUser.password) {
    // findUser role extract here
    // we create a object
    // const roles = Object.values(findUser.roles)
    // { firstName: findUser.firstName },
    // replacing this to
    /**
     * {
     *  "UserInfo": {
     *    "firstName": findUser.firstName,
     *    "roles": roles
     * }
     * }
     *
     */
    // create jwt
    const accessToken = jwt.sign(
      { firstName: findUser.firstName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 }
    );
    const refreshToken = jwt.sign(
      { username: findUser.firstName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    const userId = findUser.id

    const newRefreshToken = await prisma.refreshToken.upsert({
      where: { userId },
      update: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      create: {
        userId,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // to deal with cors related issue we add more info to the responding cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 100, // 7 days
    });

    res.json({ accessToken });
  } else {
    res.status(401).json("Sorry, password do not match. Try again, please.");
  }
};

module.exports = { handleLogin };
