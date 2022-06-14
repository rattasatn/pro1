const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const upload = require("../middlewares/upload");

router.post("/", upload.single("productPic"), adminController.createProduct);

module.exports = router;
