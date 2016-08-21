'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'Jack',
      password: 'PasswordJack',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Jill',
      password: 'PasswordJill',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users');
  }
};
