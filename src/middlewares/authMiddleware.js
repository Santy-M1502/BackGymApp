const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ msg: "Token faltante" });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: "Token inválido" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err){
      console.log("Token verification error:", err.message);
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
};
