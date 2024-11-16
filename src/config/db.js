require("dotenv").config();
const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");
const { logger } = require("../utils/logger");
const { MONGO_URI, POSTGRES_URI } = require("./environment");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info("MongoDB connected successfully.");
  } catch (error) {
    logger.error(`Error connecting to MongoDB:, ${error.message}`);
    throw error;
  }
};

const sequelize = new Sequelize(POSTGRES_URI, {
  dialect: "postgres",
  logging: false, // Disable SQL query logging
});
const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    logger.info("PostgreSQL connected successfully.");
  } catch (error) {
    logger.error(`Error connecting to PostgreSQL:, ${error.message}`);
    throw error;
  }
};

module.exports = {
  connectMongoDB,
  connectPostgres,
  sequelize,
};
