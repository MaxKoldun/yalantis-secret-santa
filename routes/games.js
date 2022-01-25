const game = require('express').Router();
const db = require('../models/index');

game.route('/')
	.get(async (req, res) => {
        try {
            const games = await db.Game.findAll();
        
            res.send(games);
        } catch(err) {
            console.log('There was an error querying games', JSON.stringify(err));

            return res.send(err)
        }
	})
	.post(async (req, res) => {
        try {
            const { name } = req.body;
            const newGame = await db.Game.create({ name });
        
            res.send(newGame);
        } catch(err) {
            console.log('***There was an error creating a game', JSON.stringify(err));

            return res.send(err)
        }
	});

module.exports = game;