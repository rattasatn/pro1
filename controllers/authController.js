const createError = require("../utils/createError.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Customer } = require("../models");

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JET_EXPIRES_IN,
  });
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });

    if (!customer) {
      createError(400, "Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      createError(400, "Invalid email or password");
    }
    const token = genToken({ id: customer.id });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
exports.signup = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      address,
    } = req.body;
    if (!email) {
      createError("email is required", 400);
    }
    if (!phoneNumber) {
      createError("Phone Number is required", 400);
    }
    if (!password) {
      createError("password is required", 400);
    }
    if (password !== confirmPassword) {
      createError("password did not match", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const customer = await Customer.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    const token = genToken({ id: customer.id });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
