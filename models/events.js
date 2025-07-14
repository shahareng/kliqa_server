const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  event_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
  },
  event_date: {
    type: DataTypes.DATEONLY,
  },
}, {
  tableName: 'events',
  timestamps: false,
});

module.exports = Event;
