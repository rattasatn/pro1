module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      forGender: {
        type: DataTypes.ENUM("men", "women"),
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productPic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    { underscored: true }
  );
  Product.associate = (models) => {
    Product.hasMany(models.Like, {
      foreignKey: {
        name: "ProductId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Product.hasMany(models.Image, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Product.hasMany(models.OrderItem, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Product;
};
