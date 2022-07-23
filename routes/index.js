const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

router.use(userRouter);
router.use(cardRouter);
router.use((req, res) => {
  res.status(404);
  res.send({ message: 'Wrong URL' });
});

module.exports = router;
