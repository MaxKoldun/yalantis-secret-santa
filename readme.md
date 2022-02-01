**The next tools with the versions should be installed before running the app:**

npm: 6.14.13

node: 14.17.3

sqlite3: 3.31.1

sequelize-cli: 6.4.1
nodemon: 2.0.12

**Environment the project was created:**

Ubuntu 20.04

**Starting the app:**

1. *npm i*
2. *npm run migrate* // create only tables

   2.1. *npm run seed* // create tables and fill them with wishes and users to test shuffling

3. *npm start*
4. Open http://localhost:3000/api-docs // swagger documentation with routes
5. Run tests npm run test
6. Collect coverage npm run coverage


**API the app supports:**

```js
// I created this entitie more for testing purposes to avoid drop database everytime I need to test shuffling
```

1. Game

POST: **/api/games**

BODY :

```js
{
  name: ["string", "required"];
}
```

2. Users

POST: **/api/users**

BODY :

```js
{
  first : [ 'required', 'string', { 'max_length': 255 } ],
  last : [ 'required', 'string', { 'max_length': 255 } ],
  game_id : [ 'required', 'positive_integer' ],
  wishes : [ 'required', { 'list_of_objects': [ { message: ['required','string'] } ] } ]
}
```

---

POST: **/api/users/shuffle**

BODY :

```js
{
  game_id: ["required", "positive_integer"];
}
```

---

GET: **/api/users/santa/:user_id**
