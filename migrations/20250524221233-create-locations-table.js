"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("locations", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("gen_random_uuid"),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currency_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      location_type: {
        type: Sequelize.ENUM("City", "State", "Country"),
        allowNull: true,
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_synced_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      news_articles: {
        type: Sequelize.JSONB,
        allowNull: true,
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
    await queryInterface.dropTable("locations");
  },
};
