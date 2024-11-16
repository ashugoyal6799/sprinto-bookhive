const { Book, Author } = require("../models/associations");
const { Op } = require("sequelize");
const { logger } = require("../utils/logger");

class BookService {
  async getBooks({ filter = {}, limit = 10, offset = 0 }) {
    logger.info(
      `Fetching books with filter: ${JSON.stringify(
        filter
      )}, limit: ${limit}, offset: ${offset}`
    );

    const where = {};
    if (filter.title) where.title = { [Op.iLike]: `%${filter.title}%` };
    if (filter.description)
      where.description = { [Op.iLike]: `%${filter.description}%` };
    if (filter.published_date)
      where.published_date = { [Op.eq]: new Date(filter.published_date) };

    const authorWhere = {};
    if (filter.author_name)
      authorWhere.name = { [Op.iLike]: `%${filter.author_name}%` };

    try {
      const { count, rows } = await Book.findAndCountAll({
        where,
        limit,
        offset,
        include: { model: Author, as: `author`, where: authorWhere },
      });
      logger.info(`Fetched ${rows.length} books out of total ${count}`);

      return { items: rows, totalCount: count };
    } catch (error) {
      logger.error(`Error fetching books: ${error.message}`);
      throw error;
    }
  }

  async createBook({ title, description, published_date, author_id }) {
    logger.info(
      `Creating book with title: ${title}, description: ${description}, published_date: ${published_date}, author_id: ${author_id}`
    );

    try {
      const book = await Book.create({
        title,
        description,
        published_date,
        author_id,
      });
      logger.info(`Created book with id: ${book.id}`);

      return book;
    } catch (error) {
      logger.error(`Error creating book: ${error.message}`);
      throw error;
    }
  }

  async updateBook({ id, title, description, published_date, author_id }) {
    logger.info(`Updating book with id: ${id}`);

    try {
      const book = await Book.findByPk(id);
      if (!book) {
        logger.warn(`Book with id: ${id} not found`);
        throw new Error(`Book not found`);
      }
      const updatedBook = await book.update({
        title,
        description,
        published_date,
        author_id,
      });
      logger.info(`Updated book with id: ${id}`);

      return updatedBook;
    } catch (error) {
      logger.error(`Error updating book: ${error.message}`);
      throw error;
    }
  }

  async deleteBook(id) {
    logger.info(`Deleting book with id: ${id}`);

    try {
      const book = await Book.findByPk(id);
      if (!book) {
        logger.warn(`Book with id: ${id} not found`);
        throw new Error(`Book not found`);
      }
      const deletedBook = { ...book.get() };
      await book.destroy();
      logger.info(`Deleted book with id: ${id}`);

      return deletedBook;
    } catch (error) {
      logger.error(`Error deleting book: ${error.message}`);
      throw error;
    }
  }

  async getBooksByAuthor(authorId) {
    logger.info(`Fetching books for author_id: ${authorId}`);

    try {
      const books = await Book.findAll({ where: { author_id: authorId } });
      logger.info(`Fetched ${books.length} books for author_id: ${authorId}`);

      return books;
    } catch (error) {
      logger.error(`Error fetching books: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new BookService();
