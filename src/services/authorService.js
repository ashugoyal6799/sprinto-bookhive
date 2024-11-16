const { Author } = require("../models/associations");
const { Op } = require("sequelize");
const { logger } = require("../utils/logger");

class AuthorService {
  async getAuthors({ filter = {}, limit = 10, offset = 0 }) {
    logger.info(
      `Fetching authors with filter: ${JSON.stringify(
        filter
      )}, limit: ${limit}, offset: ${offset}`
    );

    const where = {};
    if (filter.name) where.name = { [Op.iLike]: `%${filter.name}%` };
    if (filter.biography)
      where.biography = { [Op.iLike]: `%${filter.biography}%` };

    try {
      const { count, rows } = await Author.findAndCountAll({
        where,
        limit,
        offset,
      });
      logger.info(`Fetched ${rows.length} authors out of total ${count}`);

      return { items: rows, totalCount: count };
    } catch (error) {
      logger.error(`Error fetching authors: ${error.message}`);
      throw error;
    }
  }

  async createAuthor({ name, biography, born_date }) {
    logger.info(
      `Creating author with name: ${name}, biography: ${biography}, born_date: ${born_date}`
    );

    try {
      const author = await Author.create({ name, biography, born_date });
      logger.info(`Created author with id: ${author.id}`);

      return author;
    } catch (error) {
      logger.error(`Error creating author: ${error.message}`);
      throw error;
    }
  }

  async updateAuthor({ id, name, biography, born_date }) {
    logger.info(`Updating author with id: ${id}`);

    try {
      const author = await Author.findByPk(id);
      if (!author) {
        logger.warn(`Author with id: ${id} not found`);
        throw new Error(`Author not found`);
      }
      const updatedAuthor = await author.update({ name, biography, born_date });
      logger.info(`Updated author with id: ${id}`);

      return updatedAuthor;
    } catch (error) {
      logger.error(`Error updating author: ${error.message}`);
      throw error;
    }
  }

  async deleteAuthor(id) {
    logger.info(`Deleting author with id: ${id}`);

    try {
      const author = await Author.findByPk(id);
      if (!author) {
        logger.warn(`Author with id: ${id} not found`);
        throw new Error(`Author not found`);
      }
      await author.destroy();
      logger.info(`Deleted author with id: ${id}`);

      return author;
    } catch (error) {
      logger.error(`Error deleting author: ${error.message}`);
      throw error;
    }
  }

  async getAuthorById(id) {
    logger.info(`Fetching author by id: ${id}`);

    try {
      const author = await Author.findByPk(id);
      if (!author) {
        logger.warn(`Author with id: ${id} not found`);
      }

      return author;
    } catch (error) {
      logger.error(`Error fetching author: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new AuthorService();
