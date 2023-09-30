require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require ('cors');

const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO_DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

mongoose.connect(MONGO_DB, {
  family: 4,
});

app.use(cors({origin: ['http://localhost:3001', 'http://localhost:3000','http://sysoev.nomoreparties.co','https://sysoev.nomoreparties.co','https://api.sysoev.nomoreparties.co'], credentials: true, maxAge: 30}))
const NotFoundError = require('./error/notFoundError');

const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');


const isAuth = require('./middlewares/auth');

app.use(express.json());
app.use(bodyParser.json());
app.use(requestLogger);

app.use(authRoutes);
app.use(isAuth);
app.use(usersRoutes);
app.use(moviesRoutes);

app.use(errorLogger);
app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());


app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});


app.listen(PORT, () => {
  console.log('Сервер запущен');
});
