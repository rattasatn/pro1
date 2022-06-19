const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/", cartController.createCart);
router.get("/cartId/", cartController.getCartById);
router.delete("/deleteCart/:id", cartController.deleteCart);
router.delete("/deleteCartCustomer/", cartController.deleteCartCustomer);

module.exports = router;
