'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserCard = sequelize.define('UserCard', {
    user_id: DataTypes.INTEGER,
    card_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserCard;
};