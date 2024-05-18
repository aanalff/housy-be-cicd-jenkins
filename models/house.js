"use strict";
module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define(
    "house",
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      price: DataTypes.INTEGER,
      typeRent: DataTypes.STRING,
      amenities: {
        type: DataTypes.STRING,
        set(value) {
          return this.setDataValue("amenities", value.toString());
        },
        get() {
          const data = this.getDataValue("amenities");
          return data && data.split(",");
        }
      },
      images: DataTypes.STRING(1000),
      bedroom: DataTypes.INTEGER,
      bathroom: DataTypes.INTEGER,
      area: DataTypes.STRING,
      description: DataTypes.STRING(1000),
      city: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {}
  );
  House.associate = function(models) {
    House.belongsTo(models.user);
    House.hasMany(models.transaction);
  };
  return House;
};
