const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const EventUser = sequelize.define('EventUser', {
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    validate: {
      isInt: { msg: 'event_id must be an integer' },
      min: { args: [1], msg: 'event_id must be a positive number' },
    },
    references: {
      model: 'events',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    validate: {
      isInt: { msg: 'user_id must be an integer' },
      min: { args: [1], msg: 'user_id must be a positive number' },
    },
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'event_users',
  timestamps: false,
});

module.exports = EventUser;
