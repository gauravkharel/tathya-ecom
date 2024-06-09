const express = require("express");
const router = express.Router();
const cartController = require("../../controller/cartController");

router
  .route("/")
  .get(cartController.getCarts)
  .delete(cartConrtoller.deleteCarts);

router
  .route("/:id")
  .put(clothingsController.updateCartItem)
  .delete(clothingsController.deletCartItem)
  .get(clothingsController.getCartItem);

module.exports = router;
