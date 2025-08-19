const routineService = require('../services/routineService');

exports.getAllRoutines = async (req, res) => {
  const routines = await routineService.getAllRoutines();
  res.json(routines);
};

exports.getRoutineById = async (req, res) => {
  const routine = await routineService.getRoutineById(req.params.id);
  if(!routine) return res.status(404).json({ error: 'Rutina no encontrada' });
  res.json(routine);
};

exports.getRoutineByUser = async (req, res) => {
  const userId = req.user.id;
  const routines = await routineService.getRoutineByUserId(userId);
  res.json(routines);
};


exports.createRoutine = async (req, res) => {
  const routine = await routineService.createRoutine(req.body);
  res.status(201).json(routine);
};

exports.updateRoutine = async (req, res) => {
  const routine = await routineService.updateRoutine(req.params.id, req.body);
  if(!routine) return res.status(404).json({ error: 'Rutina no encontrada' });
  res.json(routine);
};

exports.deleteRoutine = async (req, res) => {
  const routine = await routineService.deleteRoutine(req.params.id);
  if(!routine) return res.status(404).json({ error: 'Rutina no encontrada' });
  res.json({ message: 'Rutina eliminada correctamente' });
};
