// models/group_users.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const GroupUser = sequelize.define('GroupUser', {
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'community_group',
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
  tableName: 'group_users',
  timestamps: false,
});

module.exports = GroupUser;
