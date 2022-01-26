const { LIVR } = require('../registerValidationRules.js');
const db = require('../../models');
const { Op } = require("sequelize");

class UsersCreate {
    static validationRules = {
        first : [ 'required', 'string', { 'max_length': 255 } ],
        last :  [ 'required', 'string', { 'max_length': 255 } ],
        game_id : [ 'required', 'positive_integer' ],
        wishes : [ 'required',  
            { 'list_length': [1, 10] },
            { 'list_of_objects': [ { message: ['required','string'] } ] }
        ]
    };

    async execute(req, res) {
        try {
            const { first, last, game_id, wishes } = req.body;
            const validator = new LIVR.Validator(UsersCreate.validationRules);
            validator.validate({ first, last, game_id, wishes });
            if (validator.getErrors()) {
                return res.status(422).send({ 
                    message: 'Input parameters are not valid', 
                    errors: validator.getErrors() 
                });
            }

            const searchedGame = await db.Game.findByPk(game_id);

            if (!searchedGame) {
                return res.status(404).send({ message: 'Game with the id is not found' });
            }

            const registeredUsers = await db.User.findAll({
                where: {
                    game_id: {
                        [Op.eq]: game_id
                    }
                }
            });
    
            if (registeredUsers.length === 500) {
                return res.status(403).send({ message: 'Max user quantity is reached for this game, please create a new one' });
            }
    
            const newUser = await db.User.create(
                {
                    first, 
                    last, 
                    game_id,
                    wishes: wishes
                },
                {
                    include: [ { as: 'wishes', model: db.Wish } ]
                }
            );
        
            res.send(newUser);
        } catch(err) {
            console.log('***There was an error creating a user', JSON.stringify(err));
    
            return res.send(err)
        }
    }
}

module.exports = new UsersCreate()