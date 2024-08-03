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
      { email: findUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: Math.floor(Date.now() / 1000) + 30 * 60 }
    );
    const refreshToken = jwt.sign(
      { email: findUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: Math.floor(Date.now() / 1000) + 10 * 60 * 60 }
    );

    const userId = findUser.id;

    const newRefreshToken = await prisma.refreshToken.upsert({
      where: { userId },
      update: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 10 * 60 * 60 * 1000),
      },
      create: {
        userId,
        token: refreshToken,
          expiresAt: new Date(Date.now() + 10 * 60 * 60 * 1000),
      },
    });

    // to deal with cors related issue we add more info to the responding cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      //Thunder client extension in VS code does not recognise localhost development server urls
      //as protected routes (https or http secure) (for example http://localhost:3500/refresh and http://localhost:3500/auth),
      //hence it will not make the token available for requests. So the only option is to set the secure
      //option to "false" to allow it to pass.

      // true when testing with the frontend.
      secure: true,
      maxAge: new Date(Date.now() + 10 * 60 * 60 * 1000), // 10 hours
    });

    res.json({ accessToken, email });
  } else {
    res.status(401).json("Sorry, password do not match. Try again, please.");
  }
};

module.exports = { handleLogin };
