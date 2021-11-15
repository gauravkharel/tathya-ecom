const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const products = require("../data/products");

//Setting dotenv file
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

//initailly, delete all the products and then, update the databse
const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products Seeded");
    process.exit;
  } catch (error) {
    console.log(error.message);
    process.exit;
  }
};

seedProducts();
