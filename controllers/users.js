const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    }).catch((err) => next(new UnauthorizedError(err.message)));
};

const getUser = (req, res, next) => {
  const userId = req.params.userId ? req.params.userId : req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(
          'Пользователь по указанному id не найден.',
        );
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new ValidationError('Некорректный формат id.'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name, email, password: hash,
      },
    ))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(
          `Пользователь с email '${email}' уже существует.`,
        ));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании пользователя.'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(
          'Пользователь по указанному id не найден.',
        );
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(
          `Пользователь с email '${email}' уже существует.`,
        ));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  login, getUser, createUser, updateUser,
};
