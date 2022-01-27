const { LIVR } = require('../registerValidationRules.js');
const db = require('../../models');

class GameCreate {
    static validationRules = {
        name : [ 'required', 'string' ]
    };

    async execute(req, res) {
        try {
            const { name } = req.body;
            const validator = new LIVR.Validator(GameCreate.validationRules);
            validator.validate({ name });
            if (validator.getErrors()) {
                return res.status(422).send({ 
                    message: 'Input parameters are not valid', 
                    errors: validator.getErrors() 
                });
            }
            const newGame = await db.Game.create({ name });

            res.send(newGame);
        } catch(err) {
            console.log('***There was an error creating a game', JSON.stringify(err));

            return res.send(err)
        }
    }
}

module.exports = new GameCreate()