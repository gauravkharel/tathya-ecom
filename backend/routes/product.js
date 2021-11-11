const express = require('express');
const router = express.Router();

const { getProducts } = require('../controllers/productController');

router.route('/products').get(getProducts);
router.route('/products/new').post(newProduct);

module.exports = router;
