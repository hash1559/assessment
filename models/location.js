// models/location.js

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {}

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
