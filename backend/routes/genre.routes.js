import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { createGenre, updateGenre, removeGenre, listGenres } from '../controllers/genre.controller.js';
import { checkId } from '../middlewares/checkId.js';

const router = express.Router();

router.route('/')
  .post(authenticate, authorizeAdmin, createGenre)
  .get(listGenres);

router.route('/:id')
  .put(authenticate, authorizeAdmin, checkId, updateGenre)
  .delete(authenticate, authorizeAdmin, checkId, removeGenre);

export default router;

