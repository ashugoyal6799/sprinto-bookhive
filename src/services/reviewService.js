const Review = require("../models/Review");
const { logger } = require("../utils/logger");

class ReviewService {
  async getReviewsByBook(bookId) {
    logger.info(`Fetching reviews for book_id: ${bookId}`);

    try {
      const reviews = await Review.find({ bookId });
      logger.info(`Fetched ${reviews.length} reviews for book_id: ${bookId}`);

      return reviews;
    } catch (error) {
      logger.error(`Error fetching reviews: ${error.message}`);
      throw error;
    }
  }

  async getReviewsByAuthor(authorId) {
    logger.info(`Fetching reviews for author_id: ${authorId}`);

    try {
      const reviews = await Review.find({ authorId });
      logger.info(
        `Fetched ${reviews.length} reviews for author_id: ${authorId}`
      );

      return reviews;
    } catch (error) {
      logger.error(`Error fetching reviews: ${error.message}`);
      throw error;
    }
  }

  async addReview(input) {
    logger.info(`Adding review: ${JSON.stringify(input)}`);

    try {
      const review = new Review(input);
      await review.save();
      logger.info(`Added review with id: ${review.id}`);

      return review;
    } catch (error) {
      logger.error(`Error adding review: ${error.message}`);
      throw error;
    }
  }

  async updateReview({ id, content, rating }) {
    logger.info(`Updating review with id: ${id}`);

    try {
      const review = await Review.findById(id);
      if (!review) {
        logger.warn(`Review with id: ${id} not found`);
        throw new Error(`Review not found`);
      }

      if (content) review.content = content;
      if (rating) review.rating = rating;
      await review.save();
      logger.info(`Updated review with id: ${id}`);

      return review;
    } catch (error) {
      logger.error(`Error updating review: ${error.message}`);
      throw error;
    }
  }

  async deleteReview(id) {
    logger.info(`Deleting review with id: ${id}`);

    try {
      const review = await Review.findByIdAndDelete(id);
      if (!review) {
        logger.warn(`Review with id: ${id} not found`);
        throw new Error(`Review not found`);
      }
      logger.info(`Deleted review with id: ${id}`);

      return review;
    } catch (error) {
      logger.error(`Error deleting review: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new ReviewService();
