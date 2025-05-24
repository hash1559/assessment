// models/news_article.js

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class NewsArticle extends Model {}

  NewsArticle.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      published_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      source_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      source_name: {
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
      modelName: "NewsArticle",
      tableName: "news_articles",
      timestamps: true,
      paranoid: false,
      underscored: true,
    }
  );

  return NewsArticle;
};
