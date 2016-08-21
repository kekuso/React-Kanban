'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    title: DataTypes.STRING,
    priority: DataTypes.STRING,
    status: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    assignedTo: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Card.belongsToMany(models.User,
          {
            as: 'users',
            through: 'UserCard',
            foreignKey: 'card_id'
          });
      }
    }
  });
  return Card;
};