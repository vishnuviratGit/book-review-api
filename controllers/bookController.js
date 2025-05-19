import Book from "../models/Book.js";
import Review from "../models/Review.js";

/*method for posting a new Book*/
export const postBook =async(req, res)=>{
    try{
     const{title, author, genre}=req.body;
     const book = new Book({title, author, genre});
     const result = await book.save();
     return res.status(200).json(result);
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
}

/*Getting all the books   */
export const getAllBooks=async(req, res)=>{
    try{
       const{author, genre, page=1, limit=10}=req.query;
       const filter={}
       if(author) filter.author = new RegExp(author, "i");
       if(genre) filter.genre = new RegExp(genre, "i");
       const books = await Book.find(filter)
         .skip((page-1)*limit) 
         .limit(parseInt(limit))
       return res.status(200).json(books);
    }
    catch{
        return res.status(500).json({error: error.message})
    }
}

/*getting books by id*/
export const getBooksById= async(req, res)=>{
     try {
    const { id } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const book = await Book.findById(id).populate({
      path: 'reviews',
      options: {
        skip: (page - 1) * limit,
        limit: parseInt(limit)
      },
      populate: { path: 'user', select: 'email' }
    });

    if (!book) return res.status(404).json({ message: 'Book not found' });

    const allReviews = await Review.find({ book: id });
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / (allReviews.length || 1);

    res.status(200).json({ book, avgRating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/*posting review for a book*/
export const postReview= async(req, res)=>{
      try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const existingReview = await Review.findOne({ user: req.user.id, book: id });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({
      User: req.user.id,
      book: id,
      rating,
      comment
    });
    await review.save();

    const book = await Book.findById(id);
    book.reviews.push(review._id);
    await book.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

