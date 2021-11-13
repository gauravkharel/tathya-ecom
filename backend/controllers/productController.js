const Product = require('../models/product');

// Create a new product
exports.newProduct = (async(req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        succcess: true,
        message: 'Product created successfully',
        product

    });
})


exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Product fetched sucessfully"
    });
};