"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION"
      },
      paid: {
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER
      },
      checkin: {
        type: Sequelize.STRING
      },
      checkout: {
        type: Sequelize.STRING
      },
      houseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "houses",
          key: "id"
        }
      },
      total: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      attachment: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable("transactions");
  }
};
