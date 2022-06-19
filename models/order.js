const {
  STATUS_COMPLETE,
  STATUS_CANCEL,
  STATUS_PENDING,
} = require("../config/constants");
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
        type: DataTypes.ENUM(STATUS_COMPLETE, STATUS_CANCEL, STATUS_PENDING),
        allowNull: false,
        defaultValue: STATUS_PENDING,
      },
      slip: {
        type: DataTypes.STRING,
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
    });
    Order.belongsTo(models.Customer, {
      foreignKey: {
        name: "customerId",
        allowNull: false,
      },
    });
  };
  return Order;
};
