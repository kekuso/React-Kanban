'use strict';
var faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var fakeCards = [];

    for(var i = 0; i < 20; i++) {
      var fakeTitle = faker.lorem.word();
    }
  },

  down: function (queryInterface, Sequelize) {

  }
};
