'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
        first: 'Test user 1',
        last: 'Test user 1',
        game_id: 1,
        santa_for_id: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first: 'Test user 2',
        last: 'Test user 2',
        game_id: 1,
        santa_for_id: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first: 'Test user 3',
        last: 'Test user 3',
        game_id: 1,
        santa_for_id: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
