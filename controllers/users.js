/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BAD_REQUEST_ERROR, NOT_FOUND_ERROR, SERVER_ERROR } = require('../utils/errors');

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'E-mail или пароль не переданы' });
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(409).send({ message: 'Пользователь с таким e-mail уже существует' });
    }
  });

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    }).then((user) => {
      res.status(201).send(user);
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
  });
};

const getUsers = (req, res) => {
  User.find({}).then((users) => res.status(200).send(users))
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findOneAndUpdate(
    { id: userId },
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findOneAndUpdate(
    { id: userId },
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'E-mail или пароль не переданы' });
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'Такого пользователя не существует' });
      }
      bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          return res.status(401).send({ message: 'Неверный пароль' });
        }
        const token = jwt.sign({ _id: user._id }, 'super-strong-secret'); // id или _id?
        return res.status(200).send({ token });
      });
    })
    .catch(() => res.status(500).send({ mesage: 'Ошибка сервера' }));
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  login,
};
