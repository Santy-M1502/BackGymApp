const Exercise = require('../models/exercise');

exports.getAllExercises = async () => {
  return await Exercise.findAll();
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
