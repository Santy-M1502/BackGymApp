const planService = require('../services/planService');

exports.getAllPlans = async (req, res) => {
  const plans = await planService.getAllPlans();
  res.json(plans);
};

exports.getPlanBy = async (req, res) => {
  const plan = await planService.getPlanBy(req.params.id);
  res.json(plan)
}

exports.createPlan = async (req, res) => {
  const plan = await planService.createPlan(req.body);
  res.status(201).json(plan);
};

exports.updatePlan = async (req, res) => {
  const plan = await planService.updatePlan(req.params.id, req.body);
  if(!plan) return res.status(404).json({error:'Plan no encontrado'})
  res.json(plan)
}

exports.deletePlan = async (req,res) => {
  const plan = await planService.deletePlan(req.params.id);
  if(!plan) return res.status(404).json({error:'Plan no encontrado'})
    res.json({message:'Plan eliminado correctamente'})
}

