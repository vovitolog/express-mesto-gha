const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ owner, name, link })
    .then((card) => {
      res.status(201).send(card);
    });
};

const getCards = (req, res) => {
  Card.find({}).then((cards) => res.status(200).send(cards));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id).then((card) => res.status(200).send(card));
};

const likeCard = (req, res) => {
  // const cardId = req.params.id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((card) => res.status(200).send(card));
};

const dislikeCard = (req, res) => {
  // const cardId = req.params.id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then((card) => res.status(200).send(card));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
