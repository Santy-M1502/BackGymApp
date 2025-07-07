const User = require('../models/user');
const Plan = require('../models/plan');

exports.getAllUsers = async () => {
  return await User.findAll({ include: Plan });
};

exports.getUserBy = async (id) => {
  return await User.findByPk(id)
};

exports.createUser = async (data) => {
  return await User.create(data);
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
