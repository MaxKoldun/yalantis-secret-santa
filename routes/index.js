const games = require("./games.js");
const users = require("./users.js");
const wishes = require("./wishes.js");

module.exports = app => {
  app.use("/api/games", games),
  app.use("/api/wishes", wishes),
  app.use("/api/users", users)
};