const express = require("express");
const router = express.Router();
const cartController = require("../../controller/cartController");

router
  .route("/").get(cartController.getCarts)
//   .delete(cartController.deleteCarts);

// router
//   .route("/:id")
//   .put(cartController.updateCartItem)
//   .delete(cartController.deletCartItem)
//   .get(cartController.getCartItem);

module.exports = router;
