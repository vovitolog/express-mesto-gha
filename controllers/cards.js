const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ owner, name, link })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(500).send({ message: `Ошибка сервера ${err}` });
    });
};

const getCards = (req, res) => {
  Card.find({}).then((cards) => res.status(200).send(cards));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id).then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
    }
    res.status(200).send(card);
  })
    .catch((err) => res.status(500).send({ message: `Ошибка сервера ${err}` }));
};

const likeCard = (req, res) => {
  // const cardId = req.params.id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
    }
    res.status(200).send(card);
  })
    .catch((err) => res.status(500).send({ message: `Ошибка сервера ${err}` }));
};

const dislikeCard = (req, res) => {
  // const cardId = req.params.id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
    }
    res.status(200).send(card);
  })
    .catch((err) => res.status(500).send({ message: `Ошибка сервера ${err}` }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
