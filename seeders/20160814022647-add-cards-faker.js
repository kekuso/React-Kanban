'use strict';
var faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var fakeCards = [];
    var fakePriorities = ['low', 'Medium', 'High', 'Blocker'];
    var fakeStatuses = ['Queue', 'In Progress', 'Done'];

    for(var i = 0; i < 20; i++) {
      var fakeTitle = faker.hacker.verb() + ' ' + faker.hacker.noun();
      var fakePriority = fakePriorities[Math.floor(Math.random() * fakePriorities.length)];
      var fakeStatus = fakeStatuses[Math.floor(Math.random() * fakeStatuses.length)];
      var fakeCreatedBy = faker.name.firstName() + ' ' + faker.name.lastName();
      var fakeAssignedTo = faker.name.firstName() + ' ' + faker.name.lastName();

      var fakeCard = {
        title: fakeTitle,
        priority: fakePriority,
        status: fakeStatus,
        createdBy: fakeCreatedBy,
        assignedTo: fakeAssignedTo,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      fakeCards.push(fakeCard);
    }
    return queryInterface.bulkInsert('Cards', fakeCards);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cards');
  }
};
