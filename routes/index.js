const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { NOT_FOUND_ERROR } = require('../utils/errors');

router.use(userRouter);
router.use(cardRouter);
router.use((req, res) => {
  res.status(NOT_FOUND_ERROR);
  res.send({ message: 'Wrong URL' });
});

module.exports = router;
