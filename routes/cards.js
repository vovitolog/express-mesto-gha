const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().trim().uri(),
    }),
  },
), createCard);
router.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);
router.put('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);
router.delete('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = router;
