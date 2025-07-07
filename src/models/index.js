const User = require('./user');
const Plan = require('./plan');
const Exercise = require('./exercise');
const History = require('./history');

Plan.hasMany(User, { foreignKey: 'idPlan' });
User.belongsTo(Plan, { foreignKey: 'idPlan' });

User.hasMany(History, { foreignKey: 'userId' });
Exercise.hasMany(History, { foreignKey: 'exerciseId' });

History.belongsTo(User, { foreignKey: 'userId' });
History.belongsTo(Exercise, { foreignKey: 'exerciseId' });

module.exports = {
  User,
  Exercise,
  History,
  Plan
};