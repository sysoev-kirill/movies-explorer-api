const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateInfoUser,
  getInfoAboutMe,
} = require('../controllers/users');

const regexUrl = /https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%.+~#=/?&]*)/i;

router.get('/users/me', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getInfoAboutMe);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(2).max(30),
  }),
}), updateInfoUser);

module.exports = router;
