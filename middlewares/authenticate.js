const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");
const { Customer } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      createError(401, "You are unauthorized");
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      createError(401, "You are unauthorized");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const customer = await Customer.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!customer) {
      createError(401, "You are unauthorized");
    }
    req.customer = customer;
    next();
  } catch (err) {
    next(err);
  }
};
