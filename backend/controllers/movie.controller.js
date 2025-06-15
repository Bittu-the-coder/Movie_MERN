import asyncHandler from "../middlewares/asyncHandler.js";
import Movie from "../models/movie.modal.js";

const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getSpecificMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMovie = await Movie.findById(id);
    // const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
    //   new: true,
    // });
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    updatedMovie.set(req.body);
    await updatedMovie.save();
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const movieReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const alreadyReviewed = movie.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).json({ message: "Movie already reviewed" });
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    movie.reviews.push(review);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
      movie.reviews.length;

    await movie.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await movie.deleteOne();
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deleteMovieReview = asyncHandler(async (req, res) => {
  const { id, reviewId } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (movie.reviews[reviewIndex].user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }
    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
      (movie.reviews.length || 1);
    await movie.save();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getNewMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getTopRatedMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find().sort({ rating: -1 }).limit(10);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { createMovie, getAllMovies, getSpecificMovie, updateMovie, deleteMovie, movieReview, deleteMovieReview, getNewMovies, getTopRatedMovies, getRandomMovies };