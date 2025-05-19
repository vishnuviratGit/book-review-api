import express from "express"
import { getAllBooks, getBooksById, postBook, postReview } from "../controllers/bookController.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

router.post("/", verifyToken, postBook);
router.get("/", getAllBooks);
router.get("/:id", getBooksById);
router.post("/:id/reviews",verifyToken, postReview);

export default router;