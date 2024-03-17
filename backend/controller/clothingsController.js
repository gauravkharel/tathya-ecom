// to CRUD clothing products
const prisma = require("../lib/db");

const getAllClothings = async (req, res) => {
  try {
    const clothings = await prisma.clothing.findMany();
    res.json(clothings);
    console.log("Fetched clothings");
  } catch (err) {
    res.status(204).json({ message: "No clothings found." });
  }
};

const getSingleClothing = async(req,res) => {
  try{

  } catch{
    
  }
}

const createNewClothing = async (req, res) => {
  const { name, description, price, imageUrl, brand, colors, sizes, agegroup } =
    req.body;
  const newClothing = await prisma.clothing.create({
    data: {
      name: name,
      description: description,
      price: price,
      imageUrl: imageUrl,
      brand: brand,
      colors: colors,
      sizes: sizes,
    },
  });
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
