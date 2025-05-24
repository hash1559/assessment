// models/exchange_rate.js

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ExchangeRate extends Model {}

  ExchangeRate.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      base_currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      target_currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      location_id: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "location_id",
      },
    },
    {
      sequelize,
      modelName: "ExchangeRate",
      tableName: "exchange_rates",
      timestamps: true,
      paranoid: false,
      underscored: true,
    }
  );

  return ExchangeRate;
};
