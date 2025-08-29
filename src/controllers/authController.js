// src/controllers/authController.js
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// ====================== HELPERS ======================
const generateAccessToken = (user) => 
  jwt.sign({ id: user.id, rol: user.rol }, JWT_SECRET, { expiresIn: "15m" });

const generateRefreshToken = (user) => 
  jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: "7d" });

const verifyRefreshToken = (token) => jwt.verify(token, JWT_REFRESH_SECRET);

// ====================== REGISTER ======================
exports.register = async (req, res) => {
  try {
    const { email, contrasena, nombre, apellido, dni, telefono, diasRestantes } = req.body;

    if (!nombre || !email || !contrasena || !apellido || !dni || !telefono || !diasRestantes) {
      return res.status(400).json({ msg: "Faltan campos obligatorios." });
    }

    const existe = await User.findOne({ where: { email } });
    if (existe) return res.status(409).json({ msg: "El email ya está registrado." });

    const hashPwd = await bcrypt.hash(contrasena, 10);

    const user = await User.create({
      nombre,
      email,
      contrasena: hashPwd,
      apellido,
      dni,
      telefono,
      diasRestantes,
      rol: "socio"
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    // Cookies separadas para cada token
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000 // 15 min
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
    });

    res.status(201).json({
      accessToken,
      user: { id: user.id, nombre: user.nombre, rol: user.rol }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno al registrar." });
  }
};

// ====================== LOGIN ======================
exports.login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    if (!email || !contrasena) return res.status(400).json({ msg: "Faltan datos" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ msg: "Email o contraseña incorrecta" });

    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) return res.status(401).json({ msg: "Email o contraseña incorrecta" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      accessToken,
      user: { id: user.id, nombre: user.nombre, rol: user.rol }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno" });
  }
};

// ====================== REFRESH TOKEN ======================
exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ msg: "Falta refresh token." });

    const payload = verifyRefreshToken(refreshToken);

    const user = await User.findByPk(payload.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ msg: "Refresh token inválido." });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken: newAccessToken });

  } catch (err) {
    console.log("Refresh token error:", err.message);
    res.status(403).json({ msg: "Refresh token inválido o expirado." });
  }
};

// ====================== LOGOUT ======================
exports.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(400).json({ msg: "Falta refresh token." });

    const user = await User.findOne({ where: { refreshToken } });
    if (!user) return res.status(400).json({ msg: "Token no encontrado." });

    user.refreshToken = null;
    await user.save();

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ msg: "Logout exitoso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en logout." });
  }
};

// ====================== VALIDATE ======================
exports.validate = async (req, res) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    res.json({ valid: true, user });
  });
};
