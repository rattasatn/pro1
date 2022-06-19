module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      coverPic: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  return Image;
};
