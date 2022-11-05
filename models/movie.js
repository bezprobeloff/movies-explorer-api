const mongoose = require('mongoose');
const { regexLink } = require('../utils/constants');
const { regexImageLink } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  image: {
    type: String,
    default: '',
    validate: {
      validator: (image) => regexImageLink.test(image),
      message: 'Некорректный формат ссылки на картинку фильма',
    },
  },
  trailerLink: {
    type: String,
    default: '',
    validate: {
      validator: (link) => regexLink.test(link),
      message: 'Некорректный формат ссылки на трейлер фильма',
    },
  },
  thumbnail: {
    type: String,
    default: '',
    validate: {
      validator: (image) => regexImageLink.test(image),
      message: 'Некорректный формат ссылки на мини-картинку фильма',
    },
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.SchemaTypes.ObjectId,
    // На данный момент неизвестно с какой схемой связана
    // ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 1,
  },
  nameEn: {
    type: String,
    required: true,
    minlength: 1,
  },
});

module.exports = mongoose.model('movie', movieSchema);
