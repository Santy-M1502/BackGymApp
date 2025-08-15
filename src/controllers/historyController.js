const historyService = require('../services/historyService');

exports.getAllHistorys = async (req, res) => {
  const historys = await historyService.getAllHistorys();
  res.json(historys);
};

exports.getHistoryBy = async (req, res) => {
  const history = await historyService.getHistoryById(req.params.id);
  res.json(history)
}

exports.createHistory = async (req, res) => {
  try {
    const data = {
      ...req.body,
      userId: req.user.id // <-- automáticamente del usuario logueado
    };

    const history = await historyService.createHistory(data);
    res.status(201).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear historial' });
  }
};


exports.updateHistory = async (req, res) => {
  const history = await historyService.updateHistory(req.params.id, req.body);
  if(!history) return res.status(404).json({error:'Cliente no encontrado'})
  res.json(history)
}

exports.deleteHistory = async (req,res) => {
  const history = await historyService.deleteHistory(req.params.id);
  if(!history) return res.status(404).json({error:'Cliente no encontrado'})
    res.json({message:'Cliente eliminado correctamente'})
}

