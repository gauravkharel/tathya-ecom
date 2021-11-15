const Product = require("../models/product");

// Create a new product
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    succcess: true,
    message: "Product created successfully",
    product,
  });
};

//Getting all products
exports.getProducts = (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

// Fetch a single product by id
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
};

//Update a product  by id   (admin) 
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
        return res.status(404).json({
        success: false,
        message: "Product not found",
        });
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
    };  //end of updateProduct

//Delete a product by id (admin)
exports.deleteProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
        return res.status(404).json({
        success: false,
        message: "Product not found",
        });
    }

    product = await Product.findByIdAndDelete(req.params.id);
        
    res.status(200).json({
        success: true,
        product,
    });
    }
    

