// models/weather.js

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Weather extends Model {}

  Weather.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      temperature: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wind_speed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wind_direction: {
        type: DataTypes.STRING,
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
      modelName: "Weather",
      tableName: "weathers",
      timestamps: true,
      paranoid: false,
      underscored: true,
    }
  );

  return Weather;
};
