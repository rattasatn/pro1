module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { underscored: true }
  );
  Cart.associate = (models) => {
    Cart.belongsTo(models.Customer, {
      foreignKey: {
        name: "customerId",
      },
    }),
      Cart.belongsTo(models.Product, {
        foreignKey: {
          name: "productId",
        },
      });
  };
  return Cart;
};
