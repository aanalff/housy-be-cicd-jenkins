"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      fullName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.transaction);
    User.hasMany(models.house);
  };
  return User;
};