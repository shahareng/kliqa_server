const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Connection = sequelize.define('Connection', {
  match_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id1: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  user_id2: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  connection_date: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'connections',
  timestamps: false,
});

module.exports = Connection;
