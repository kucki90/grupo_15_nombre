'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Rol,{
        as : 'rol'
      })
    }
  };
  User.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    birthday: DataTypes.DATE,
    email: DataTypes.STRING,
    AVATAR: DataTypes.STRING,
    password: DataTypes.STRING,
    notify: DataTypes.BOOLEAN,
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};