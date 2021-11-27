const Product = require("../model/product"); // Import Product Model Schema
const ErrorHandler = require("../utils/errorHandler"); // Importing ErrorHandler from utils
const catchAsyncErrors = require("../middlewares/catchAsyncErrors"); // Importing catchAsyncErrors from middlewares
const APIFeatures = require("../utils/apiFeatures"); // Importing APIFeatures from utils

// Create a new product
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    succcess: true,
    message: "Product created successfully",
    product,
  });
});

//Getting all products by /api/v1/products?keyword=
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

  const resPerPage = 4; // results per page
  
  const productCount = await Product.countDocuments(); // Count the number of documents in the collection
  const apiFeatures = new APIFeatures(Product.find(), req.query) // Pass the query to the APIFeatures class
    .search() // Search the query
    .filter() // Filter the query
    .pagination(resPerPage); // Paginate the query
  const products = await apiFeatures.query; // Execute the query

  // Send response
  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products,
  });
});

// Fetch a single product by id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Update a product  by id (admin)
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  // Check if product exists
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  // Check if user is authorized to update product
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });

  // Send response
  res.status(200).json({
    success: true,
    product,
  });
});

//Delete a product by id (admin)
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  // Check if product exists
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  // Check if user is authorized to delete product
  product = await Product.findByIdAndDelete(req.params.id);

  // Send response
  res.status(200).json({
    success: true,
    product,
  });
});
