const { Cart, Product } = require("../models");
const createError = require("../utils/createError");

exports.createCart = async (req, res, next) => {
  try {
    const { amount, productId, customerId } = req.body;
    const cart = await Cart.create({
      amount: amount >= 1 ? amount : 1,
      productId,
      customerId,
    });
    res.status(201).json({ cart });
  } catch (err) {
    next(err);
  }
};

exports.getCartById = async (req, res, next) => {
  try {
    const { id } = req.customer;

    const cart = await Cart.findAll({
      where: { customerId: id },
      order: [["createdAt", "desc"]],
      include: {
        model: Product,
        attributes: ["price", "productPic", "productName"],
      },
    });

    if (!cart) {
      createError("cart not found", 400);
    }
    res.status(200).json({ cart });
  } catch (err) {
    next(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ where: { id } });
    if (!cart) {
      createError("cart not found", 400);
    }
    await cart.destroy();
    res.status(200).json({ message: "cart deleted" });
  } catch (err) {
    next(err);
  }
};
exports.deleteCartCustomer = async (req, res, next) => {
  let t;
  try {
    const { id } = req.customer;
    const cart = await Cart.findAll({ where: { customerId: id } });
    if (!cart) {
      createError("cart not found", 400);
    }
    await cart.destroy({ where: { customerId: id } }, { transaction: t });
    await t.commit();
    res.status(200).json({ message: "cart deleted" });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};
