const centralError = (err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500).send({ message: 'Неизвестная ошибка' });
  }
  res.status(err.statusCode).send({ message: err.message });
  next();
};

module.exports = centralError;
