require("dotenv").config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/book_reviews";
const POSTGRES_URI =
  process.env.POSTGRES_URI ||
  "postgres://postgres:password@localhost:5432/postgres";

module.exports = {
  MONGO_URI,
  POSTGRES_URI,
};
