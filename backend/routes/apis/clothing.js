const express = require('express');
const router = express.Router();
const clothingsController = require('../../controllers/clothingsController');

router.route('/')
    .get( clothingsController.getAllclothings)
    .post(clothingsController.createNewclothing)
    .put(clothingsController.updateclothing)
    .delete(clothingsController.deleteclothing);

router.route('/:id')
    .get(clothingsController.getclothing);

module.exports = router;