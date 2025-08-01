const { Op } = require('sequelize');
const Exercise = require('../models/exercise');

exports.getAllExercises = async (filters = {}) => {
  const where = {};

  if (filters.buscar && filters.buscar.trim() !== '') {
    where.nombre = { [Op.iLike]: `%${filters.buscar.trim()}%` };
  }

  if (filters.musculo && filters.musculo.trim() !== '') {
    where.musculo = filters.musculo.trim();
  }

  return await Exercise.findAll({ where });
};


exports.getExerciseBy = async (id) => {
  return await Exercise.findByPk(id)
};

exports.createExercise = async (data) => {
  return await Exercise.create(data);
};

exports.updateExercise = async (id, data) =>{
  const exercise = await Exercise.findByPk(id);
  if(!exercise) return null;
  return await exercise.update(data)
};

exports.deleteExercise = async(id) =>{
  const exercise = await Exercise.findByPk(id);
  if(!exercise) return null
  await exercise.destroy();
  return true;
};
