'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('wishes', [{
        message: 'Book',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'Game',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'Cup',
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('wishes', null, {});
  }
};
