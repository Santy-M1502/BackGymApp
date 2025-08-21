const Routine = require('../models/rutina');
const User = require('../models/user');
const Exercise = require('../models/exercise');
const { Op } = require("sequelize");

exports.getAllRoutines = async () => {
  return await Routine.findAll({
    include: [User, Exercise]
  });
};

exports.getRoutineById = async (id) => {
  return await Routine.findByPk(id, {
    include: [User, Exercise]
  });
};

exports.getRoutineByUserId = async (userId) => {
  return await Routine.findAll({
    where: { usuarioId: userId },
    include: [Exercise] 
  });
};

exports.createRoutine = async (data) => {

  return await Routine.create(data);
};

exports.updateRoutine = async (id, data) => {
  const routine = await Routine.findByPk(id);
  if(!routine) return null;
  return await routine.update(data);
};

exports.deleteRoutine = async (id) => {
  const routine = await Routine.findByPk(id);
  if(!routine) return null;
  await routine.destroy();
  return true;
};
