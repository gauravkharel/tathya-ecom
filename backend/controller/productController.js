const prisma = require("../lib/db");
const getAllCategoryIds = require("../lib/utils/getAllCategoriesIds")
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const crypto = require("crypto");
const s3Client = new S3Client({
  region: process.env.AWS_REGION ,
  credentials: {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_ACCESS_KEY
  }
})


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
        console.log('Categories ID: ', allCategoryIds)
      
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



const getPresignedUrls = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId)
    const imageRequests = req.body;
    console.log(imageRequests)

    if (!imageRequests || imageRequests.length === 0) {
      return res.status(400).json({ message: "No image provided." });
    }
    const presignedUrls = await Promise.all(
      imageRequests.map(async (image) => {
        const { fileName, fileType } = image;
        const urlString = `uploads/user-uploads/${userId}/products/${fileName}`
        console.log(urlString)
        const command = new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: urlString,
          ContentType: fileType,
        });

        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 120 });

        const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${urlString}`;

        return { imageUrl, presignedUrl };
      })
    );

    res.status(200).json(presignedUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createNewProduct = async (req, res) => {
  try {
    const { userId } = req.query;
    const {
      name,
      description,
      price,
      brand,
      category,
      stock,
      images
    } = req.body;

    if (!name || !price || !brand || !stock || !images || images.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [existingBrand, existingCategory] = await Promise.all([
      prisma.brand.findUnique({ where: { name: brand } }),
      prisma.category.findUnique({ where: { name: category } }),
    ]);

    const brandData = existingBrand
      ? { connect: { id: existingBrand.id } }
      : { create: { name: brand } };

    const categoryData = existingCategory
      ? { connect: { id: existingCategory.id } }
      : { create: { name: category } };

    const newProduct = await prisma.clothing.create({
      data: {
        name,
        description,
        price,
        stock,
        brand: brandData,
        category: categoryData,
        imageUrls: images, 
      },
      include: {
        brand: true,
        category: true,
      },
    });

    res.status(201).json({
      newProduct,
      message: "New product created successfully",
    });
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
  getPresignedUrls,
  getSingleProduct,
};
