'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('games', [{
        name: 'Test Game 2022',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },
  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('games', null, {});
  }
};
