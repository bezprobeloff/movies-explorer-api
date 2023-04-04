const path = require('path');

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://movies.bezprobeloff.ru',
  'http://api.movies.bezprobeloff.ru',
  'https://movies.bezprobeloff.ru',
  'https://api.movies.bezprobeloff.ru',
  'https://localhost:3000',
  'http://localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const PATH_MOVIESDB = 'mongodb://127.0.0.1:27017/moviesdb';
const PATH_FRONTEND = path.join(__dirname, '../../frontend');

module.exports = {
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
  PATH_MOVIESDB,
  PATH_FRONTEND,
};
