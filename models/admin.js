module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
      },
      gender: {
        type: DataTypes.ENUM("men", "women"),
      },
    },
    { underscored: true }
  );

  return Admin;
};
