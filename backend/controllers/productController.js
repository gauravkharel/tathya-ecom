const Product = require("../model/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

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

  const resPerPage = 4;
  
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeatures.query;

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

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete a product by id (admin)
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  product = await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    product,
  });
});
