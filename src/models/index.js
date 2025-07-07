const User = require('./models/userModel');
const Plan = require('./models/planModel');

Plan.hasMany(User, { foreignKey: 'idPlan' });
User.belongsTo(Plan, { foreignKey: 'idPlan' });
