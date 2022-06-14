const createError = require("../utils/createError");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const { Product, Customer } = require("../models");

exports.createProduct = async (req, res, next) => {
  try {
    const { productName, price, quantity, forGender, brand } = req.body;
    console.log(req.body);
    const customer = await Customer.findOne({
      where: {
        role: "admin",
      },
    });
    let image;
    if (req.file) {
      const result = await cloudinary.upload(req.file.path);
      image = await result.secure_url;
    }

    const product = await Product.create({
      productName,
      price,
      forGender,
      quantity,
      productPic: image,
      brand,
    });
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
