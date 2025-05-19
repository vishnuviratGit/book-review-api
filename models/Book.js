import mongoose from "mongoose";

/*book schema  */
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
}, {timestamps: true})

const Book = mongoose.model("Book", bookSchema);
export default Book;