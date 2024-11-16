const Author = require("./Author");
const Book = require("./Book");

// Define relationships
Author.hasMany(Book, { foreignKey: "author_id", as: "books" });
Book.belongsTo(Author, { foreignKey: "author_id", as: "author" });

module.exports = { Author, Book };
