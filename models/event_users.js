const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const EventUser = sequelize.define('EventUser', {
  
}, {
  tableName: 'event_users',
  timestamps: false,
});

module.exports = EventUser;
