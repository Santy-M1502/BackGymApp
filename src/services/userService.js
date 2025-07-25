const bcrypt = require('bcrypt');
const { User, Plan } = require('../models');

exports.getAllUsers = async () => {
  return await User.findAll({ include: Plan });
};

exports.getUserBy = async (id) => {
  return await User.findByPk(id)
};

exports.createUser = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(data.contrasena, salt);
  return await User.create({...data, contrasena : hashPwd});
};

exports.updateUser = async (id, data) =>{
  const user = await User.findByPk(id);
  if(!user) return null;
  return await user.update(data)
};

exports.deleteUser = async(id) =>{
  const user = await User.findByPk(id);
  if(!user) return null
  await user.destroy();
  return true;
};
