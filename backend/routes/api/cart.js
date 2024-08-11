const express = require("express");
const router = express.Router();
const cartController = require("../../controller/cartController");

router
  .route("/")
  .get(cartController.getCarts)
  .delete(cartController.deleteCartItems)
  .post(cartController.addProductToCart)

  router
  .route("/:cartId")
  .put(cartController.updateCartItem)
  .delete(cartController.deleteCartItem)
  .get(cartController.getCartItem);

module.exports = router;
