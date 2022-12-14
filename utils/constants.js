const path = require('path');

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://movies.bezprobeloff.nomoredomains.icu',
  'https://api.movies.bezprobeloff.nomoredomains.icu',
  'https://localhost:3000',
  'http://localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const PATH_MOVIESDB = 'mongodb://localhost:27017/moviesdb';
const PATH_FRONTEND = path.join(__dirname, '../../frontend');

module.exports = {
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
  PATH_MOVIESDB,
  PATH_FRONTEND,
};
