const User = require('./user');
const Plan = require('./plan');
const Exercise = require('./exercise');
const History = require('./history');
const Rutina = require('./rutina')

Plan.hasMany(User, { foreignKey: 'idPlan' });
User.belongsTo(Plan, { foreignKey: 'idPlan' });

User.hasMany(History, { foreignKey: 'userId' });
Exercise.hasMany(History, { foreignKey: 'exerciseId' });

History.belongsTo(User, { foreignKey: 'userId' });
History.belongsTo(Exercise, { foreignKey: 'exerciseId' });

User.belongsToMany(Exercise, { through: Rutina, foreignKey: 'usuarioId' });
Exercise.belongsToMany(User, { through: Rutina, foreignKey: 'ejercicioId' });
Rutina.belongsTo(User, { foreignKey: 'usuarioId' });
Rutina.belongsTo(Exercise, { foreignKey: 'ejercicioId' });


module.exports = {
  User,
  Exercise,
  History,
  Plan,
  Rutina
};