const Card = require('../models/card');
const { BAD_REQUEST_ERROR, NOT_FOUND_ERROR, SERVER_ERROR } = require('../utils/errors');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ owner, name, link })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

const getCards = (req, res) => {
  Card.find({}).then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id).then((card) => {
    if (!card) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      return;
    }
    res.status(200).send(card);
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      return;
    }
    res.status(200).send(card);
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      return;
    }
    res.status(200).send(card);
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
