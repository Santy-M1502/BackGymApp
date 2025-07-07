const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const planRoutes = require('./routes/planRoutes');
const historyRoutes = require('./routes/historyRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json())

const sequelize = require('./config/db');

// Conexion a DB
sequelize.authenticate()
  .then(() => console.log('Conexión a DB exitosa.'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));

sequelize.sync({ alter: true })
  .then(() => console.log('Modelos sincronizados con la base de datos'));

// Rutas
app.use('/api/user', userRoutes);
app.use('/api/exercise', exerciseRoutes);
app.use('/api/plan', planRoutes);
app.use('/api/history', historyRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
