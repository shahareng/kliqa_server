const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const EventUser = sequelize.define('EventUser', {
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
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
