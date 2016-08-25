'use strict';
var faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var fakeCards = [];
    var priorities = ['low', 'Medium', 'High', 'Blocker'];
    var statuses = ['Queue', 'In Progress', 'Done'];
    // var names = ['Jack', 'Jill'];
    var name1 = 'Jack';
    var name2 = 'Jill';

    for(var i = 0; i < 2; i++) {
      var fakeTitle = faker.hacker.verb() + ' ' + faker.hacker.noun();
      var priority = priorities[Math.floor(Math.random() * priorities.length)];
      var status = statuses[Math.floor(Math.random() * statuses.length)];
      // var createdBy = names[Math.floor(Math.random() * names.length)];
      // var assignedTo = names[Math.floor(Math.random() * names.length)];

      var fakeCard = {
        title: fakeTitle,
        priority: priority,
        status: status,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      fakeCards.push(fakeCard);
    }

    fakeCards[0].createdBy = name1;
    fakeCards[0].assignedTo = name1;
    fakeCards[1].createdBy = name2;
    fakeCards[1].assignedTo = name2;

    return queryInterface.bulkInsert('Cards', fakeCards);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cards');
  }
};

