'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Card,
         {
          as: 'cards',
          through: 'UserCard',
          foreignKey: 'user_id'
        });
      }
    }
  });
  return User;
};