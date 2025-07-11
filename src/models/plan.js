const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Plan = sequelize.define('Plan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dias: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Plan;
