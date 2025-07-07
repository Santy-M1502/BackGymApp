const historyService = require('../services/historyService');

exports.getAllHistorys = async (req, res) => {
  const historys = await historyService.getAllHistorys();
  res.json(historys);
};

exports.getHistoryBy = async (req, res) => {
  const history = await exerciseService.getHistoryBy(req.params.id);
  res.json(history)
}

exports.createHistory = async (req, res) => {
  const history = await historyService.createHistory(req.body);
  res.status(201).json(history);
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

