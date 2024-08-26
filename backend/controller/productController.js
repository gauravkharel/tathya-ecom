const prisma = require("../lib/db");
const getAllCategoryIds = require("../lib/utils/getAllCategoriesIds")

const getAllProducts = async (req, res) => {
  try {
    if (!req.query.take) {
      req.query.take = 10;
    } else {
      req.query.take = parseInt(req.query.take, 10);
      if (!Number.isInteger(req.query.take)) {
        req.query.take = 1;
      }
    }
    if (!req.query.skip) {
      req.query.skip = 4;
    } else {
      req.query.skip = parseInt(req.query.skip, 4);
      if (!Number.isInteger(req.query.skip)) {
        req.query.skip = 1;
      }
    }

    const { categories, brands} = req.query;
    
    const filters = {};
    if (categories) {
      let categoryArray = new Array();
      categoryArray = categories.split(',');

      const allCategoryIds = await getAllCategoryIds(categoryArray);
        filters.category = {
          id: { in: allCategoryIds },
        };
        console.log('Categories ID: ', allCategoryIds); // Logging category IDs
      
    }
    if (brands) {
      let brandArray = new Array();
      brandArray = brands.split(',')
      filters.brand = {
        name: { in: brandArray },
      };
      console.log('Brand', brand)
    }
       
    const products = await prisma.clothing.findMany({
      skip: +req.query.skip,
      take: +req.query.take,
      where: filters,
      include: {
        brand: true,
        category: {
          include: {
            parent: true,
            subCategories: true
          }
        },
      },
    });

    if (!products) {
      return res.status(204).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};



const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.clothing.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product item not found" });
    }

    res.status(200).json(existingProduct);
  } catch {
    res.status(204).json({ message: "No product found." });
  }
};



// to create new product/product product
const createNewProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      imageUrl,
      brand,
      gender,
      category,
      stock,
    } = req.body;

    // Validate the incoming data
    if (!name || !price || !brand || !gender || !category || !stock) {
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

    // Create new product item
    const newProduct = await prisma.clothing.create({
      data: {
        name,
        description,
        price,
        stock,
        brand: brandData,
        gender: genderData,
        category: categoryData,
      },
      include: {
        brand: true,
        gender: true,
        category: true,
      },
    });

    res.status(201).json({ newProduct, message: "New product created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
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

    const existingProduct = await prisma.clothing.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product item not found" });
    }

    const updatedProduct = await prisma.clothing.update({
      where: { id: parseInt(id) },
      data: {
        name: name || existingProduct.name,
        description: description || existingProduct.description,
        price: price || existingProduct.price,
        imageUrl: imageUrl || existingProduct.imageUrl,
        brandId: brandId || existingProduct.brandId,
        genderId: genderId || existingProduct.genderId,
        categoryId: categoryId || existingProduct.categoryId,
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

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.clothing.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product item not found" });
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
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};
