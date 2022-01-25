The next tools with the versions should be installed before running the app:

npm: 6.14.13
node: 14.17.3
sqlite3: 3.31.1
sequelize-cli: 6.4.1

Environment the project was created:

Ubuntu 20.04

---

API the app supports:

1. Game // I created this entitie more for testing purposes to avoid drop database everytime I need to test shuffling

GET /api/games
BODY : { name: [ 'string', 'required' ] }

2. Users // Participants of the secret santa game. Should be at least 3 but not more than 500 per the game.

POST /api/users
BODY : {
first : [ 'required', 'string', { 'max_length': 255 } ],
last : [ 'required', 'string', { 'max_length': 255 } ],
game_id : [ 'required', 'positive_integer' ],
wishes : [ 'required', { 'list_of_objects': [ { message: ['required','string'] } ] } ]
}

POST /api/users/shuffle
BODY : { game_id : [ 'required', 'positive_integer' ] }

GET /api/users/santa/:user_id // Returns a user with his wishes that should receive a gift from the user with user_id
