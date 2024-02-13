const prisma = require("../lib/db");
const { createHmac } = require("node:crypto");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email)
    return res.status(400).json({ message: "Email address is required." });

  if (!password)
    return res.status(400).json({ message: "Password is required." });

  const foundUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!foundUser) {
    res.status(404).json("User not found. Please try again with valid email.");
  }
  const userSalt = foundUser.salt;
  const userHashPassword = createHmac("sha256", userSalt)
    .update(password)
    .digest("hex");

  if (userHashPassword == foundUser.password) {
    // create jwt
    const accessToken = jwt.sign(
      { firstName: foundUser.firstName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "200s" }
    );

    res.json({accessToken})
  } else {
    res.status(401).json("Sorry, password do not match. Try again, please.");
  }

//   res.status(200).json(`${foundUser.firstName} is logged in sucessfully`);

  //generate token
};

module.exports = { handleLogin };
