"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("exchange_rates", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("gen_random_uuid"),
        primaryKey: true,
      },
      base_currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      target_currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rate: {
        type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable("exchange_rates");
  },
};
