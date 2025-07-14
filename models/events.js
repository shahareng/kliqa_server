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
    validate: {
      notEmpty: { msg: 'Event name must not be empty' },
      len: { args: [3, 255], msg: 'Event name must be between 3 and 255 characters' },
    },
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Location must not be empty' },
      len: { args: [3, 255], msg: 'Location must be between 3 and 255 characters' },
    },
  },
  event_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Event date must not be empty' },
      isDate: { msg: 'Event date must be a valid date' },
    },
  },
}, {
  tableName: 'events',
  timestamps: false,
});

module.exports = Event;
