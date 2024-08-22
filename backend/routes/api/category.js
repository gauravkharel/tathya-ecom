const express = require("express");
const router = express.Router();
const categoryController = require("../../controller/categoryController");

router
  .route("/")
  .get(categoryController.getAllCategories)

  module.exports = router