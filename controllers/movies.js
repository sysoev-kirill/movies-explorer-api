const Movie = require('../models/movie');

const ForbiddenError = require('../error/forbiddenError');
const ValidationError = require('../error/validationError');
const NotFoundError = require('../error/notFoundError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch((err) => next(err));
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
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным id не найден');
      } else if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => res.send(movie));
      } else {
        throw new ForbiddenError('Вы не можете удалить фильм другого пользователя');
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};


module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
