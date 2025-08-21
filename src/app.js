const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');
require('dotenv').config()
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const planRoutes = require('./routes/planRoutes');
const historyRoutes = require('./routes/historyRoutes');
const authRoutes = require('./routes/authRoutes');
const pagosRouter = require('./routes/pagosRouter');
const routineRoutes = require('./routes/routineRoutes.js')

const app = express();

const logger = winston.createLogger({
  level:'info',
  format:winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports:[
    new winston.transports.File({filename: 'logs/error.log', level:'error'}),
    new winston.transports.File({filename:'logs/combined.log'}),
  ],
})

// Middlewares
app.use(cors({
  origin: process.env.FRONT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
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
app.use('/api/rutina', routineRoutes)

module.exports = app