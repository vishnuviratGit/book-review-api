import express from "express"
import { deleteReview, searchBooks, updateReview } from "../controllers/reviewController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.put("/reviews/:id",verifyToken, updateReview);
router.delete("/reviews/:id",verifyToken, deleteReview);
router.get("/search", searchBooks)

export default router;