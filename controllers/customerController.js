const { Customer } = require("../models");
const createError = require("../utils/createError");

exports.getCustomer = async (req, res, next) => {
  try {
    const { id } = req.customer;
    const customer = await Customer.findOne({
      where: {
        id,
      },
    });
    if (!customer) {
      createError(404, "Customer not found");
    }
    console.log(customer);
    res.status(200).json({
      customer,
    });
  } catch (err) {
    next(err);
  }
};

exports.UpdateCustomer = async (req, res, next) => {
  try {
    const { id } = req.customer;
    const customer = await Customer.findOne({
      where: {
        id,
      },
    });
    if (!customer) {
      createError(404, "Customer not found");
    }
    const { firstName, lastName, password, address } = req.body;
    await customer.update({
      firstName,
      lastName,
      password,
      address,
    });
    res.status(200).json({
      customer,
    });
  } catch (err) {
    next(err);
  }
};
