const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера ${err}` });
    });
};

const getUsers = (req, res) => {
  User.find({}).then((users) => res.status(200).send(users));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера ${err}` });
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
        res.status(400).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера ${err}` });
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
        res.status(400).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера ${err}` });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
};
