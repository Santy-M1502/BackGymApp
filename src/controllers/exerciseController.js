const exerciseService = require('../services/exerciseService');

exports.getAllExercises = async (req, res) => {
  const exercises = await exerciseService.getAllExercises();
  res.json(exercises);
};

exports.getExerciseBy = async (req, res) => {
  const exercise = await exerciseService.getExerciseBy(req.params.id);
  res.json(exercise)
}

exports.createExercise = async (req, res) => {
  const exercise = await exerciseService.createExercise(req.body);
  res.status(201).json(exercise);
};

exports.updateExercise = async (req, res) => {
  const exercise = await exerciseService.updateExercise(req.params.id, req.body);
  if(!exercise) return res.status(404).json({error:'Cliente no encontrado'})
  res.json(exercise)
}

exports.deleteExercise = async (req,res) => {
  const exercise = await exerciseService.deleteExercise(req.params.id);
  if(!exercise) return res.status(404).json({error:'Cliente no encontrado'})
    res.json({message:'Cliente eliminado correctamente'})
}

