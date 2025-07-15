const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const CommunityValue = sequelize.define('CommunityValue', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  lable: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'community_value',
  timestamps: false,
});

module.exports = CommunityValue;
