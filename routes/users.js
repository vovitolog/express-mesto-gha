const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateProfile, updateAvatar, getProfile,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getProfile);
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUserById);
router.patch('/users/me', celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  },
), updateProfile);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().trim().uri(),
  }),
}), updateAvatar);

module.exports = router;
