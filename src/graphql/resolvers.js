const authorService = require("../services/authorService");
const bookService = require("../services/bookService");
const reviewService = require("../services/reviewService");

const resolvers = {
  Query: {
    books: async (_, args) => bookService.getBooks(args),
    authors: async (_, args) => authorService.getAuthors(args),
    reviewsByBook: async (_, { bookId }) =>
      reviewService.getReviewsByBook(bookId),
    reviewsByAuthor: async (_, { authorId }) =>
      reviewService.getReviewsByAuthor(authorId),
  },
  Mutation: {
    createAuthor: async (_, args) => authorService.createAuthor(args),
    updateAuthor: async (_, args) => authorService.updateAuthor(args),
    deleteAuthor: async (_, { id }) => authorService.deleteAuthor(id),
    createBook: async (_, args) => bookService.createBook(args),
    updateBook: async (_, args) => bookService.updateBook(args),
    deleteBook: async (_, { id }) => bookService.deleteBook(id),
    addReview: async (_, { input }) => reviewService.addReview(input),
    updateReview: async (_, args) => reviewService.updateReview(args),
    deleteReview: async (_, { id }) => reviewService.deleteReview(id),
  },
  Author: {
    books: async (parent) => bookService.getBooksByAuthor(parent.id),
  },
  Book: {
    author: async (parent) => authorService.getAuthorById(parent.author_id),
  },
};

module.exports = resolvers;
