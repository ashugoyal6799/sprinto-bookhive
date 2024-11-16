const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    bookId: { type: String, required: true },
    authorId: { type: String },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
