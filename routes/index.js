const games = require("./games.js");
const users = require("./users.js");

module.exports = app => {
  app.use("/api/games", games),
  app.use("/api/users", users)
};