const db = require('../models');
const { Op } = require("sequelize");
const { shuffle } = require("../utils/array");

const shuffleUsers = async (req, res) => {
    try {
        const { game_id } = req.body;

        if (!game_id) {
            return res.status(403).send({ message: 'A game id is required to shuffle users' });
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

        if (registeredUsers.length < 3) {
            return res.status(403).send({ message: 'Should be 3 or more users to start the game' });
        }

        let resultOfShuffling = shuffle(registeredUsers);
        let shuffleBad = registeredUsers.some((user, index) => {
            if (registeredUsers[index].id === resultOfShuffling[index].id) return true;
        });

        while (shuffleBad) {
            resultOfShuffling = shuffle(registeredUsers);

            shuffleBad = registeredUsers.some((user, index) => {
                if (registeredUsers[index].id === resultOfShuffling[index].id) return true;
            });
        }

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

const createUser = async (req, res) => {
    try {
        const { first, last, game_id, wishes } = req.body;

        if (!game_id) {
            return res.status(403).send({ message: 'A game id is required to create a new user' });
        }

        if (!wishes || wishes.length === 0) {
            return res.status(403).send({ message: 'A user should have at least one wish to take participation in a game' });
        }

        if (wishes.length > 10) {
            return res.status(403).send({ message: 'A user can not have more than ten wishes' });
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

const getSanta = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(403).send({ message: 'A user id is required to find a user' });
        }

        const user = await db.User.findByPk(user_id,
        {
            attributes: [],
            include: [ 
                { 
                    model: db.User,
                    as: 'santaFor',
                    include: [ { as: 'wishes', model: db.Wish } ]
                } 
            ]
        });

        if (!user) {
            return res.status(404).send({ message: 'User is not found' });
        }
    
        res.send(user);
    } catch(err) {
        console.log('***There was an error getting a santa', JSON.stringify(err));

        return res.send(err)
    }
}

module.exports = {
    createUser,
    shuffleUsers,
    getSanta
}