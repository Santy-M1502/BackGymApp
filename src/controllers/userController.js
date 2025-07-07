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

