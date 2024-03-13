const express = require("express");
const prisma = require("../../lib/db");
const router = express.Router();
const clothingsController = require("../../controller/clothingsController");
router
  .route("/")
  .get(clothingsController.getAllClothings)
  .post(clothingsController.createNewClothing)
  .put(clothingsController.updateClothing)
  .delete(clothingsController.deleteClothing);

// router.route("/:id").get(clothingsController.getclothing);

module.exports = router;
