const express = require("express");
const prisma = require("../../lib/db");
const router = express.Router();
const clothingsController = require("../../controller/clothingsController");
router
  .route("/")
  .get(clothingsController.getAllClothings)
  .post(clothingsController.createNewClothing);

router
  .route("/:id")
  .put(clothingsController.updateClothing)
  .delete(clothingsController.deleteClothing)
  .get(clothingsController.getSingleClothing)

module.exports = router;
