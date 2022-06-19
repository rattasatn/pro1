const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticate = require("../middlewares/authenticate");

router.get("/", productController.getAllProducts);
router.delete("/:id", authenticate, productController.deleteProduct);
router.get("/productId/:id", productController.getProductById);
router.get("/men", productController.getMenProducts);
router.get("/women", productController.getWomenProducts);
router.put("/updateProduct/:id", authenticate, productController.UpdateProduct);

module.exports = router;
