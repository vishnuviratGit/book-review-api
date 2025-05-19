import Review from "../models/Review.js";
import Book from "../models/Book.js";

/* review update*/
export const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (review.User.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this review" });
    }
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
    await review.save();
    return res
      .status(200)
      .json({ message: "Review updated successfully", review });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/*delete review*/
export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.User.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this review" });
    }

    // Remove review from book
    await Book.updateOne(
      { _id: review.book },
      { $pull: { reviews: review._id } }
    );

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*searching books by author or title*/
export const searchBooks = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q)
      return res.status(400).json({ message: "Search query is required" });

    const books = await Book.find({
      $or: [{ title: new RegExp(q, "i") }, { author: new RegExp(q, "i") }],
    });

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
