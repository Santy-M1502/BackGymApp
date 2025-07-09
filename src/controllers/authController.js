// src/controllers/authController.js

const { User }      = require('../models');
const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const { JWT_SECRET }= process.env;

exports.register = async (req, res) => {
  try {
    const { email, contrasena, nombre, apellido, dni, telefono, diasRestantes, rol } = req.body;

    if (!nombre || !email || !contrasena || !apellido || !dni || !telefono || !diasRestantes || !rol) {
      return res.status(400).json({ msg: 'Faltan campos obligatorios.' });
    }

    const existe = await User.findOne({ where: { email } });
    if (existe) {
      return res.status(409).json({ msg: 'El email ya está registrado.' });
    }

    const salt    = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(contrasena, salt);

    const user = await User.create({
      nombre,
      email,
      contrasena: hashPwd,
      apellido,
      dni,
      telefono,
      diasRestantes,
      rol
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno al registrar.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
      return res.status(400).json({ msg: 'Faltan email o contrasena.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ msg: 'Credenciales inválidas.' });
    }

    console.log(user, user.contrasena)

    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) {
      return res.status(401).json({ msg: 'Credenciales inválidas.' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno al hacer login.' });
  }
};
