const router = require('express').Router();
const userRouter = require('./users');

router.get('/', (req, res) => {
  res.status(200);
  res.send('Hello');
});

router.use(userRouter);

module.exports = router;
