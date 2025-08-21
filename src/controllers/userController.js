const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

exports.getUserBy = async (req, res) => {
  const user = await userService.getUserBy(req.params.id);
  res.json(user)
}

exports.createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

exports.updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if(!user) return res.status(404).json({error:'Cliente no encontrado'})
  res.json(user)
}

exports.deleteUser = async (req,res) => {
  const user = await userService.deleteUser(req.params.id);
  if(!user) return res.status(404).json({error:'Cliente no encontrado'})
    res.json({message:'Cliente eliminado correctamente'})
}

exports.getDays = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.getDays(userId);

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const expirado = user.diasRestantes <= 0;

    res.json({
      diasRestantes: user.diasRestantes,
      expirado
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno' });
  }
};

exports.getUsersSearch = async (req, res) => {
  try {
    const { valor } = req.body;
    const users = await userService.getUserBySearch(valor);

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en la búsqueda de usuarios" });
  }
};

