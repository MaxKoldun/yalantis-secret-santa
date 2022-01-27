const game = require('express').Router();
const db = require('../models/index');
const controller = require('../controllers/games/index');

game.route('/').post(controller.createGame);

module.exports = game;