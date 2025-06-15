import asyncHandler from "../middlewares/asyncHandler.js";
import Genre from "../models/genre.modal.js";

const createGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Genre name is required",
      });
    }

    const existingGenre = await Genre.findOne({ name });
    if (existingGenre) {
      return res.status(400).json({
        success: false,
        message: "Genre already exists",
      });
    }

    const genre = new Genre({
      name,
    });

    await genre.save();

    res.status(201).json({
      success: true,
      data: genre,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

const updateGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Genre name is required",
    });
  }

  const genre = await Genre.findById(id);
  if (!genre) {
    return res.status(404).json({
      success: false,
      message: "Genre not found",
    });
  }

  // Check if the new name already exists for another genre
  const existingGenre = await Genre.findOne({ name, _id: { $ne: id } });
  if (existingGenre) {
    return res.status(400).json({
      success: false,
      message: "Genre with this name already exists",
    });
  }

  genre.name = name;
  await genre.save();

  res.status(200).json({
    success: true,
    data: genre,
  });
});

const removeGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const genre = await Genre.findById(id);
  if (!genre) {
    return res.status(404).json({
      success: false,
      message: "Genre not found",
    });
  }

  await Genre.deleteOne({ _id: id });

  res.status(200).json({
    success: true,
    message: "Genre removed successfully",
  });
});

const listGenres = asyncHandler(async (req, res) => {
  try {
    const genres = await Genre.find({});
    res.status(200).json({
      success: true,
      data: genres,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export { createGenre, updateGenre, removeGenre, listGenres };