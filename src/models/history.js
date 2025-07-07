const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const History = sequelize.define('History', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  exerciseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  notes: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'historial_usuario',
  timestamps: false
});

module.exports = History;
