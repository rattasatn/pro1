const fs = require("fs");
const { Order, Product, Customer, OrderItem } = require("../models");
const cloudinary = require("../utils/cloudinary");
const createError = require("../utils/createError");

exports.createOrder = async (req, res, next) => {
  try {
    const { id } = req.customer;
    const { totalPrice, statusPay } = req.body;
    let slip;
    console.log(req.file);
    if (req.file) {
      const result = await cloudinary.upload(req.file.path);
      slip = await result.secure_url;
    }
    // const customer = await Customer.findOne({
    //   where: {
    //     id: customerId,
    //   },
    // });
    // if (!customer) {
    //   createError(404, "Customer not found");
    // }
    const order = await Order.create({
      customerId: id,
      totalPrice,
      statusPay,
      slip,
    });

    res.status(201).json({ order });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.createOrderItem = async (req, res, next) => {
  try {
    const items = req.body;

    console.log("req.body");
    console.log(req.body);

    // const order = await Order.findOne({
    //   where: {
    //     id: orderId,
    //   },
    // });
    // if (!order) {
    //   createError(404, "Order not found");
    // }

    // const product = await Product.findOne({
    //   where: {
    //     id: productId,
    //   },
    // });
    // if (!product) {
    //   createError(404, "Product not found");
    // }

    // amount,Product.price,orderId,productId
    const orderItem = await OrderItem.bulkCreate(items);
    res.status(201).json({ orderItem });
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const { id } = req.customer;
    console.log(id);
    const order = await Order.findAll({});
    console.log(order);
    if (!order) {
      createError(404, "Order not found");
    }
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};
