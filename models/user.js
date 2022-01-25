'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Wish, {
        as: 'wishes',
        foreignKey: 'user_id'
      });

      User.hasOne(models.User, {
        as: 'santaFor',
        foreignKey: 'santa_for_id',
      });

      User.belongsTo(models.User, {
        foreignKey: 'santa_for_id',
      });

      User.belongsTo(models.Game, {
        foreignKey: 'game_id',
        onDelete: 'CASCADE'
      })
    }
  }
  User.init({
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    santa_for_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};