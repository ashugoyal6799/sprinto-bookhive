const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Book = sequelize.define("Book", {
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
    type: DataTypes.TEXT,
    allowNull: true,
  },
  published_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  author_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Authors",
      key: "id",
    },
  },
});

module.exports = Book;
