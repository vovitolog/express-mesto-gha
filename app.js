const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.post('/users', require('./routes/users'));
app.get('/users', require('./routes/users'));
app.use('/users', require('./routes/users')); // все операции с пользователями (получить, удалить, изменить)

app.get('/', (req, res) => {
  res.status(200);
  res.send('Hello');
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

app.use((req, res, next) => {
  req.user = {
    _id: '62d8368ae7a04886a86067e9',
  };

  next();
});
