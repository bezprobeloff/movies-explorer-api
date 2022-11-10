const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(
          'Переданы некорректные данные при создании фильма.',
        ));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;

  // сначала проверим наличие карточки и прав на удаление
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(
          'Карточка с указанным id не найдена.',
        );
      }
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError('Отсутствие прав на удаление карточки.');
      }

      // уже можно удалить карточку
      return Movie.findByIdAndRemove(req.params._id);
    })
    .then((deletedMovie) => res.send(deletedMovie))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new ValidationError('Некорректный формат id.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
