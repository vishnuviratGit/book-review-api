import mongoose from "mongoose";

/*review schema*/
const reviewSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating:   { type: Number, required: true },
    comment:  String,
}, {timestamps: true})

const Review = mongoose.model("Review", reviewSchema);
export default Review;