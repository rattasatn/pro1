const { STATUS_COMPLETE, STATUS_CANCEL } = require("../config/constants");
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      statusPay: {
        type: DataTypes.ENUM(STATUS_COMPLETE, STATUS_CANCEL),
        allowNull: false,
      },
    },
    { underscored: true }
  );
  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Order.belongsTo(models.Customer, {
      foreignKey: {
        name: "customerId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Order;
};
