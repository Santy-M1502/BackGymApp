const bcrypt = require('bcrypt');
const { User, Plan } = require('../models');

exports.getAllUsers = async () => {
  return await User.findAll({ include: Plan });
};

exports.getUserBy = async (id) => {
  console.log('getUserBy id:', id);
  return await User.findByPk(id)
};

exports.createUser = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(data.contrasena, salt);

  const plan = await Plan.findByPk(data.idPlan);
  if (!plan) throw new Error('Plan no encontrado');

  return await User.create({
    ...data,
    contrasena: hashPwd,
    diasRestantes: plan.dias
  });
};

exports.updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  if (data.idPlan) {
    data.idPlan = Number(data.idPlan);
    if (isNaN(data.idPlan)) throw new Error('idPlan inválido');
  }

  return await user.update(data);
};


exports.deleteUser = async(id) =>{
  const user = await User.findByPk(id);
  if(!user) return null
  await user.destroy();
  return true;
};

exports.getDays = async (id) => {
  const user = await User.findByPk(id, {
    include: [{ model: Plan, attributes: ['dias'] }] // Traemos solo los días del plan
  });

  if (!user) return null;

  const hoy = new Date();
  const inicio = new Date(user.createdAt); // O un campo "fechaInicio" si lo usás
  const diasTotales = user.Plan.dias;

  const diasPasados = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));
  const diasRestantes = Math.max(diasTotales - diasPasados, 0);

  return {
    diasRestantes,
    expirado: diasRestantes <= 0
  };
};


