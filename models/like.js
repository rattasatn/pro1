module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {}, { underscored: true });
  Like.associate = (models) => {
    Like.belongsTo(models.Customer, {
      foreignKey: {
        name: "customerId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Like.belongsTo(models.Product, {
      foreignKey: {
        name: "ProductId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Like;
};
