"use strict";
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "transaction",
    {
      checkin: DataTypes.STRING,
      checkout: DataTypes.STRING,
      userId: DataTypes.INTEGER,      
      houseId: DataTypes.INTEGER,
      ownerId: DataTypes.INTEGER,
      paid: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING
    },
    {}
  );
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.user);
    Transaction.belongsTo(models.house);
  };
  return Transaction;
};