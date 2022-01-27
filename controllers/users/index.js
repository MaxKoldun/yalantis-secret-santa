const usersCreate = require('./create');
const usersShuffle = require('./shuffle');
const usersGetSanta = require('./getSanta');

module.exports = {
    createUser: usersCreate.execute,
    shuffle: usersShuffle.execute,
    getSanta: usersGetSanta.execute
}