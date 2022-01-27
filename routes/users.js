const user = require('express').Router();
const controller = require('../controllers/users/index');

user.route('/santa/:user_id').get(controller.getSanta);
user.route('/').post(controller.createUser);
user.route('/shuffle').post(controller.shuffle);

module.exports = user;