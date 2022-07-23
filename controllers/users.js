const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    });
};

const getUsers = (req, res) => {
  User.find({}).then((users) => res.status(200).send(users));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id).then((user) => res.status(200).send(user));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findOneAndUpdate({ id: userId }, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findOneAndUpdate({ id: userId }, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user));
};

module.exports = {
  createUser, getUsers, getUserById, updateProfile, updateAvatar,
};
