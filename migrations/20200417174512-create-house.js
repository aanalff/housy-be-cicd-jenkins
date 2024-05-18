"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("houses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      images: {
        type: Sequelize.STRING(1000)
      },
      description: {
        type: Sequelize.STRING(1000)
      },
      typeRent: {
        type: Sequelize.STRING
      },
      amenities: {
        type: Sequelize.STRING
      },
      bedroom: {
        type: Sequelize.INTEGER
      },
      bathroom: {
        type: Sequelize.INTEGER
      },
      area: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("houses");
  }
};
