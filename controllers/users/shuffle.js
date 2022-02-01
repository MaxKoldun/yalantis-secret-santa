const { LIVR } = require('../registerValidationRules.js');
const db = require('../../models');
const { Op } = require("sequelize");
const { shuffle } = require('../../utils/array');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];

class UsersShuffle {
    static validationRules = {
        game_id : [ 'required', 'positive_integer' ]
    };

    async execute(req, res) {
        try {
            const { game_id } = req.body;
            const validator = new LIVR.Validator(UsersShuffle.validationRules);
            validator.validate({ game_id });
            if (validator.getErrors()) {
                return res.status(422).send({ 
                    message: 'Input parameters are not valid', 
                    errors: validator.getErrors() 
                });
            }
    
            const expiredUsers = await db.User.findAll({
                where: {
                    game_id: { [Op.eq]: game_id },
                    santa_for_id: { [Op.not]: null }
                }
            });
    
            if (expiredUsers.length > 0) {
                return res.status(403).send({ message: 'The game is started, please create a new one if you wanna shuffle again' });
            }
    
            const registeredUsers = await db.User.findAll({
                nest: true,
                raw : true,
                where: {
                    game_id: { [Op.eq]: game_id }
                }
            });
    
            if (registeredUsers.length < config.minUsers) {
                return res.status(403).send({ message: 'Should be 3 or more users to start the game' });
            }
    
            const resultOfShuffling = shuffle(registeredUsers);

            const shuffledUsers = await Promise.all(registeredUsers.map(async (user, index) => {
                const newUser = { ...user };
    
                newUser.santa_for_id = resultOfShuffling[index].id;
    
                await db.User.update({ santa_for_id: newUser.santa_for_id }, { where: { id: { [Op.eq]: newUser.id } } });
    
                return newUser;
            }));
    
            res.send(shuffledUsers);
        } catch(err) {
            console.log('***There was an error shuffling users', JSON.stringify(err));
    
            return res.send(err)
        }
    }
}

module.exports = new UsersShuffle()