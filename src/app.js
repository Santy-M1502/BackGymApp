const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const planRoutes = require('./routes/planRoutes');
const historyRoutes = require('./routes/historyRoutes');
const authRoutes = require('./routes/authRoutes');
const pagosRouter = require('./routes/pagosRouter');

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5501',
  credentials: true
}));
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
app.use('/', authRoutes)
app.use('/api/pagos', pagosRouter);

module.exports = app