const express = require("express");
const router = express.Router();
const productController = require("../../controller/productController");
router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createNewProduct);

router.route("/presigned-urls").post(productController.getPresignedUrls)

router
  .route("/:id")
  .put(productController.updateProduct)
  .delete(productController.deleteProduct)
  .get(productController.getSingleProduct);

module.exports = router;
