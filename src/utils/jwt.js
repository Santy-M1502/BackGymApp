const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

exports.generateAccessToken = (user) => jwt.sign(
  { id: user.id, rol: user.rol },
  JWT_SECRET,
  { expiresIn: "15m" }
);

exports.generateRefreshToken = (user) => jwt.sign(
  { id: user.id },
  JWT_REFRESH_SECRET,
  { expiresIn: "7d" }
);

exports.verifyAccessToken = (token) => jwt.verify(token, JWT_SECRET);
exports.verifyRefreshToken = (token) => jwt.verify(token, JWT_REFRESH_SECRET);
