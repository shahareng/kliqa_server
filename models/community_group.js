// models/groups.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Group = sequelize.define('Groups', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'community_group',
  timestamps: false,
});

module.exports = Group;
