const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    biography: String
    born_date: String
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    description: String
    published_date: String
    author: Author
  }

  type Review {
    id: ID!
    bookId: ID!
    authorId: ID
    content: String
    rating: Int
    createdAt: String
  }

  input ReviewInput {
    bookId: ID!
    authorId: ID
    content: String!
    rating: Int
  }

  type PaginatedBooks {
    items: [Book]
    totalCount: Int
  }

  type PaginatedAuthors {
    items: [Author]
    totalCount: Int
  }

  type Query {
    books(filter: BookFilterInput, limit: Int, offset: Int): PaginatedBooks
    authors(
      filter: AuthorFilterInput
      limit: Int
      offset: Int
    ): PaginatedAuthors
    reviewsByBook(bookId: ID!): [Review]
    reviewsByAuthor(authorId: ID!): [Review]
  }

  input BookFilterInput {
    title: String
    description: String
    published_date: String
    author_name: String
  }

  input AuthorFilterInput {
    name: String
    biography: String
    born_date: String
  }

  type Mutation {
    createAuthor(name: String!, biography: String, born_date: String): Author
    createBook(
      title: String!
      description: String
      published_date: String
      author_id: ID!
    ): Book
    updateAuthor(
      id: ID!
      name: String
      biography: String
      born_date: String
    ): Author
    deleteAuthor(id: ID!): Author
    updateBook(
      id: ID!
      title: String
      description: String
      published_date: String
      author_id: ID
    ): Book
    deleteBook(id: ID!): Book
    addReview(input: ReviewInput!): Review
    updateReview(id: ID!, content: String, rating: Int): Review
    deleteReview(id: ID!): Review
  }
`;

module.exports = typeDefs;
