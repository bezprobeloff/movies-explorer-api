const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const celebrates = require('../middlewares/celebrates');

router.get('/', getMovies);

router.post('/', celebrates.createMovie, createMovie);

router.delete('/:_id', celebrates.checkIdMovie, deleteMovie);

module.exports = router;
