const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => {
      res.status(200).send(data);
    });
};

const getUsers = (req, res) => {
  User.find({}).then((users) => res.send(users));
};

module.exports = {
  createUser, getUsers,
};
