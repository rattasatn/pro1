const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/men", productController.getMenProducts);
router.get("/women", productController.getWomenProducts);

module.exports = router;
