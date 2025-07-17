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
  need_from_community: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
  type: DataTypes.STRING,
  // unique: true,
  // validate: {
  //     is: /^[0-9+\-()\s]{7,15}$/i 
  //   }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    // unique: true,
    // validate: {
    //   isEmail: true,
    // },
  },
  
  city: {
    type: DataTypes.STRING,
  },
  years_of_experience: {
    type: DataTypes.INTEGER,
        allowNull: true,
  },
  linkedin_Id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,

  },
  facebook_url: {
    type: DataTypes.STRING,
    allowNull: true,

    // validate: {
    //   isUrl: true,
    // }
  },
  linkedin_url: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,

    // validate: {
    //   isUrl: true,
    // }
  },
  community_value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  additional_info: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  wants_updates: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  admin_notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  }
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
