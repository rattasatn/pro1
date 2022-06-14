const { Product } = require("../models");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
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
    });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};
