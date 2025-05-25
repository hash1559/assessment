// models/location.js

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.hasOne(models.Weather, {
        foreignKey: "location_id",
        as: "weather",
      });

      Location.hasOne(models.ExchangeRate, {
        foreignKey: "location_id",
        as: "exchange_rate",
      });
    }
  }

  Location.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      location_type: {
        type: DataTypes.ENUM("City", "State", "Country"),
        allowNull: true,
      },
      timezone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_synced_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      news_articles: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Location",
      tableName: "locations",
      timestamps: true,
      paranoid: false,
      underscored: true,
    }
  );

  return Location;
};
