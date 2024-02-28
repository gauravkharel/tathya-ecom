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
    // create jwt
    const accessToken = jwt.sign(
      { firstName: findUser.firstName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }
    );
    const refreshToken = jwt.sign(
      { username: findUser.firstName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "2h" }
    );

    //task: you save the refresh token in the db

    // to deal with cors related issue we add more info to the responding cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 100,
    });

    res.json({ accessToken });
  } else {
    res.status(401).json("Sorry, password do not match. Try again, please.");
  }
};

module.exports = { handleLogin };
