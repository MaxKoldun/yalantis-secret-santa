const game = require('express').Router();
const db = require('../models/index');

game.route('/')
	.get(async (req, res) => {
        try {
            const wishes = await db.Wish.findAll();
        
            res.send(wishes);
        } catch(err) {
            console.log('There was an error querying wishes', JSON.stringify(err));

            return res.send(err)
        }
	})
	.post(async (req, res) => {
        try {
            const { message, user_id } = req.body;
            const newWish = await db.Wish.create({ message, user_id });
        
            res.send(newWish);
        } catch(err) {
            console.log('***There was an error creating a wish', JSON.stringify(err));

            return res.send(err)
        }
	});

module.exports = game;