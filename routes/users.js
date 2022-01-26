const user = require('express').Router();
const db = require('../models/index');
const controller = require('../controllers/users');
const newController = require('../controllers/users/index');

user.route('/santa/:user_id').get(controller.getSanta);
user.route('/').post(newController.createUser);
user.route('/shuffle').post(controller.shuffleUsers);

module.exports = user;