const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  profile_picture: {
    type: DataTypes.STRING,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
  },
  years_of_experience: {
    type: DataTypes.INTEGER,
  },
  linkedin_Id: {
    type: DataTypes.STRING,
  },
  facebook_url: {
    type: DataTypes.STRING,
  },
  linkedin_url: {
    type: DataTypes.STRING,
  },
  community_value: {
    type: DataTypes.INTEGER,
  },
  additional_info: {
    type: DataTypes.STRING,
  },
  wants_updates: {
    type: DataTypes.BOOLEAN,
  },
  admin_notes: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
