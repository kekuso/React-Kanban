'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UserCards', [{
      card_id: 1,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      card_id: 2,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserCards');
  }
};
