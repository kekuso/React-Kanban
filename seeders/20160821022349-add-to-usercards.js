'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UserCards', [{
      card_id: 1,
      user_id: 1
    },
    {
      card_id: 1,
      user_id: 2,
    },
    {
      card_id: 2,
      user_id: 1,
    },
    {
      card_id: 2,
      user_id: 2
    }
    ], {});
  },

  down: function (queryInterface, Sequelize) {

  }
};
