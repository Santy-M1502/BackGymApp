const exerciseService = require('../services/exerciseService');

exports.getAllExercises = async (req, res) => {
  try {
    const filters = {
      buscar: req.query.buscar || '',
      musculo: req.query.musculo || ''
    };

    const exercises = await exerciseService.getAllExercises(filters);
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener ejercicios' });
  }
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

exports.getExercisesSearch = async (req, res) => {
  try {
    const { valor } = req.body;
    const exercises = await exerciseService.getExerciseBySearch(valor);

    if (!exercises || exercises.length === 0) {
      return res.status(404).json({ error: "Ejercicio no encontrado" });
    }

    res.json(exercises);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en la búsqueda de ejercicios" });
  }
};
