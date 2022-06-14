const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/", customerController.getCustomer);
router.put("/", customerController.UpdateCustomer);

module.exports = router;
