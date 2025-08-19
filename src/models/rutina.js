const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.js');
const Exercise = require('./exercise.js');

const Rutina = sequelize.define('Rutina', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' },
    allowNull: false
  },
  ejercicioId: {
    type: DataTypes.INTEGER,
    references: { model: Exercise, key: 'id' },
    allowNull: false
  },
  series: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  dia: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

Rutina.belongsTo(User, { foreignKey: 'usuarioId' });
Rutina.belongsTo(Exercise, { foreignKey: 'ejercicioId' });
User.belongsToMany(Exercise, { through: Rutina, foreignKey: 'usuarioId' });
Exercise.belongsToMany(User, { through: Rutina, foreignKey: 'ejercicioId' });

module.exports = Rutina;
