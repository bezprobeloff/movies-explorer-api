const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
Joi.objectId = require('joi-objectid')(Joi);

const customValidationUrl = (value, helpers) => {
  if (isUrl(value)) {
    return value;
  }
  return helpers.message('Передана некорректная ссылка');
};

const login = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

// использовать на случай роутера users/:userId
const getUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
});

const updateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required().min(2),
    image: Joi.string().required().custom(customValidationUrl),
    trailerLink: Joi.string().required().custom(customValidationUrl),
    thumbnail: Joi.string().required().custom(customValidationUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(1),
    nameEN: Joi.string().required().min(1),
  }),
});

const checkIdMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.objectId(),
  }),
});

module.exports = {
  login, createUser, getUser, updateUser, createMovie, checkIdMovie,
};
