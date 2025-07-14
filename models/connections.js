const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Connection = sequelize.define('Connection', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id1: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'user_id1 must be an integer' },
      min: { args: [1], msg: 'user_id1 must be a positive number' },
    },
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  user_id2: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'user_id2 must be an integer' },
      min: { args: [1], msg: 'user_id2 must be a positive number' },
      isDifferent(value) {
        if (value === this.user_id1) {
          throw new Error('user_id2 must be different from user_id1');
        }
      },
    },
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  connection_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: 'connection_date must be a valid date' },
    },
  },
}, {
  tableName: 'connections',
  timestamps: false,
});

module.exports = Connection;
