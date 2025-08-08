const cron = require('node-cron');
const User = require('../models/user.js');

cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Reduciendo días restantes...');
    await User.update(
      { diasRestantes: sequelize.literal('diasRestantes - 1') },
      { where: { diasRestantes: { [Op.gt]: 0 } } }
    );
    console.log('Días restantes actualizados');
  } catch (error) {
    console.error('Error actualizando días restantes:', error);
  }
});

