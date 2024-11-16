const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Author = sequelize.define("Author", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  born_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Author;
