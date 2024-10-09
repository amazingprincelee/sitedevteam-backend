const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path based on your structure

class User extends Model {}

User.init({
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
});

// Sync model with the database
User.sync();

module.exports = User;
