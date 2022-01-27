const { LIVR } = require('../registerValidationRules.js');
const db = require('../../models');

class UsersCreate {
    static validationRules = {
        name : [ 'required', 'string' ]
    };

    async execute(req, res) {
        try {
            const { name } = req.body;
            const newGame = await db.Game.create({ name });

            res.send(newGame);
        } catch(err) {
            console.log('***There was an error creating a game', JSON.stringify(err));

            return res.send(err)
        }
    }
}

module.exports = new UsersCreate()