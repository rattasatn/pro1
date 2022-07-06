const { Product, sequelize, Customer } = require("../models");
const createError = require("../utils/createError");
const cloudinary = require("../utils/cloudinary");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({ order: [["createdAt", "desc"]] });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getMenProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        forGender: "men",
      },
      order: [["createdAt", "desc"]],
    });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getWomenProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        forGender: "women",
      },
      order: [["createdAt", "desc"]],
    });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      createError("product not found", 400);
    }
    if (product.customerId !== req.customer.id) {
      createError("you are not authorized to delete this product", 401);
    }
    if (product.productPic) {
      const productPic = product.productPic.split("/");
      const publicId = productPic[productPic.length - 1].split(".")[0];

      await cloudinary.destroy(publicId);
    }
    await product.destroy({ where: { id } }, { transaction: t });
    await t.commit();
    res.status(200).json({ message: "product deleted" });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      createError("product not found", 400);
    }
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.UpdateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      createError("product not found", 400);
    }
    // if (product.customerId !== req.customer.id) {
    //   createError("you are not authorized to update this product", 401);
    // }
    const { productName, brand, price, forGender, quantity } = req.body;
    await product.update({
      productName,
      brand,
      price,
      forGender,
      quantity,
    });

    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};
