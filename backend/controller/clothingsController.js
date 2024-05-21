const prisma = require("../lib/db");

const getAllClothings = async (req, res) => {
  try {
    const clothings = await prisma.clothing.findMany();
    res.json(clothings);
    console.log("Fetched clothings", clothings);
  } catch (err) {
    res.status(402).json({ message: "No clothings found." });
  }
};

const getSingleClothing = async (req, res) => {
  try {
    const { id } = req.params;

    const existingClothing = await prisma.clothing.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingClothing) {
      return res.status(404).json({ error: "Clothing item not found" });
    }

    res.status(200).json(existingClothing);
  } catch {
    res.status(204).json({ message: "No clothing found." });
  }
};

// to create new product/clothing product
const createNewClothing = async (req, res) => {
  try {
    const { name, description, price, imageUrl, brand, gender, category } =
      req.body;

    // Validate the incoming data
    if (!name || !price || !brand || !gender || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if brand, genders, and category already exist, if not create them
    const [existingBrand, existingGender, existingCategory] = await Promise.all(
      [
        prisma.brand.findUnique({ where: { name: brand } }),
        prisma.gender.findUnique({ where: { name: gender } }),
        prisma.category.findUnique({ where: { name: category } }),
      ]
    );

    const brandData = existingBrand
      ? { connect: { id: existingBrand.id } }
      : { create: { name: brand } };
    const genderData = existingGender
      ? { connect: { id: existingGender.id } }
      : { create: { name: gender } };
    const categoryData = existingCategory
      ? { connect: { id: existingCategory.id } }
      : { create: { name: category } };

    // Create new clothing item
    const newClothing = await prisma.clothing.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        brand: brandData,
        gender: genderData, // Filter out empty objects
        category: categoryData,
      },
      include: {
        brand: true,
        gender: true,
        category: true,
      },
    });

    res.status(201).json({ newClothing, message: "New product created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateClothing = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      imageUrl,
      brandId,
      genderId,
      categoryId,
    } = req.body;

    const existingClothing = await prisma.clothing.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingClothing) {
      return res.status(404).json({ error: "Clothing item not found" });
    }

    const updatedProduct = await prisma.clothing.update({
      where: { id: parseInt(id) },
      data: {
        name: name || existingClothing.name,
        description: description || existingClothing.description,
        price: price || existingClothing.price,
        imageUrl: imageUrl || existingClothing.imageUrl,
        brandId: brandId || existingClothing.brandId,
        genderId: genderId || existingClothing.genderId,
        categoryId: categoryId || existingClothing.categoryId,
      },
    });

    res
      .status(200)
      .json({ message: "Product updated succesfully.", updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteClothing = async (req, res) => {
  try {
    const { id } = req.params;

    const existingClothing = await prisma.clothing.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingClothing) {
      return res.status(404).json({ error: "Clothing item not found" });
    }

    const deleteSelected = await prisma.clothing.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Deleted Sucessfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllClothings,
  createNewClothing,
  updateClothing,
  deleteClothing,
  getSingleClothing,
};
