"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("weathers", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("gen_random_uuid"),
        primaryKey: true,
      },
      temperature: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      wind_speed: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      wind_direction: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "locations",
          },
          key: "id",
        },
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("weathers");
  },
};
