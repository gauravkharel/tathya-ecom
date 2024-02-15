const prisma = require("../lib/db");
const {createHmac, randomBytes} = require("node:crypto")
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
  const { fname, lname, email, password, profileImageUrl } = req.body;  
  if (!email || !password) 
  return res.status(400).json({ message: "Please add all the required credentials." });
  
  const findUser = await prisma.user.findUnique({
    where: {
      email: email
    },
  });

  if (findUser) return res.sendStatus(409);
  try {
    const salt = randomBytes(32).toString("hex")
    const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");    
    const addUser = await prisma.user.create({
      data: {
        firstName: fname,
        lastName: lname,
        email: email,
        password: hashedPassword,
        salt: salt,
        profileImageUrl: profileImageUrl
      },
    });

    const allUsers = await prisma.user.findMany();
    console.dir(allUsers, { depth: null });
    res.status(201).json({'success': `New user ${fname} is created. Please login again.`})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
