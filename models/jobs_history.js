const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const JobsHistory = sequelize.define('JobsHistory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
    },
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isDate: true,
      isAfterStart(value) {
        if (value && this.start_date && new Date(value) < new Date(this.start_date)) {
          throw new Error('End date must be after start date');
        }
      },
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
    },
  },
  job_title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 255],
    },
  },
}, {
  tableName: 'jobs_history',
  timestamps: false,
});

module.exports = JobsHistory;
