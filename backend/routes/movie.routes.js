import express from "express";
const router = express.Router();

// Controllers
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovieReview,
  getNewMovies,
  getTopRatedMovies,
  getRandomMovies,
  deleteMovie,
} from "../controllers/movie.controller.js";

// Middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { checkId } from "../middlewares/checkId.js";

// Routes
router
  .route("/")
  .post(authenticate, authorizeAdmin, createMovie)
  .get(getAllMovies);

router.route('/create-movie')
  .post(authenticate, authorizeAdmin, createMovie);
router
  .route("/new")
  .get(getNewMovies);

router
  .route("/top")
  .get(getTopRatedMovies);

router
  .route("/random")
  .get(getRandomMovies);

router
  .route("/:id")
  .get(getSpecificMovie)
  .put(authenticate, authorizeAdmin, updateMovie)
  .delete(authenticate, authorizeAdmin, deleteMovie);
router
  .route("/:id/review")
  .post(authenticate, movieReview);
router
  .route("/:id/review/:reviewId")
  .delete(authenticate, deleteMovieReview);

router.param("id", checkId);

export default router;