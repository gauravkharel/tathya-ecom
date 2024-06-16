const express = require("express");
const router = express.Router();
const orderController = require("../../controller/orderController");

router
  .route("/")
  .get(orderController.getAllOrder)
  .delete(orderController.deleteOrders);

router
  .route("/:id")
  .put(orderController.updateOrderById)
  .delete(orderController.deleteSingleOrder)
  .get(orderController.getOrderByOrderId);


module.exports = router;
