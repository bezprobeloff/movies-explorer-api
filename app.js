const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();
const { PATH_MOVIESDB, PATH_FRONTEND } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsPolicy } = require('./middlewares/corsPolicy');
const centralError = require('./middlewares/centralError');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(PATH_MOVIESDB, {});

app.use(requestLogger);

app.use(express.static(PATH_FRONTEND));
app.use(corsPolicy);

app.use(routes);
// пишем в лог ошибки
app.use(errorLogger);
// обработка ошибок celebrate
app.use(errors());
// обрабатываем централизованно ошибки
app.use(centralError);

app.listen(PORT);
