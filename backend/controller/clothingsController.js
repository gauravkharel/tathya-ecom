// to CRUD clothing products
const prisma = require("../lib/db");

const getAllClothings = async (req, res) => {
  const clothings = await prisma.clothing.findMany();
  if (!clothings) return res.status(204).json({ 'message': 'No clothings found.' });
  res.json(clothings);
  console.log('Fetched clothings')
};

const createNewClothing = async (req, res) => {
  // const newClothing = await prisma.clothing.create({})
  res.json({ "product-created": "hi" });
};

const updateClothing = async (req, res) => {
  res.json({ message: "1" });
};

const deleteClothing = async (req, res) => {
  res.json({ message: "1" });
};

module.exports = {
  getAllClothings,
  createNewClothing,
  updateClothing,
  deleteClothing,
};
