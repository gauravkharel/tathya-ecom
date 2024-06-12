const express = require("express");
const router = express.Router();
const orderController = require("../../controller/orderControler");

router
  .route("/")
  .get(orderController.getAllOrder)
  .delete(orderController.deleteOrders);

router
  .route("/:id")
  .put(orderController.updateOrderById)
  .delete(orderController.deleteSingleOrder)
  .get(orderController.getOrderByOrderId);

router.route("/:userId").get(orderController.getOrderByUserIds);

module.exports = router;
