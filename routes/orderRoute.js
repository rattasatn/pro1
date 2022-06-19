const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const upload = require("../middlewares/upload");

router.post("/", upload.single("slip"), orderController.createOrder);
router.post("/orderItem/", orderController.createOrderItem);
router.get("/getOrder", orderController.getOrder);

module.exports = router;
