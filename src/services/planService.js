const Plan = require('../models/plan');

exports.getAllPlans = async () => {
  return await Plan.findAll();
};

exports.getPlanBy = async (id) => {
  return await Plan.findByPk(id)
};

exports.createPlan = async (data) => {
  return await Plan.create(data);
};

exports.updatePlan = async (id, data) =>{
  const plan = await Plan.findByPk(id);
  if(!plan) return null;
  return await plan.update(data)
};

exports.deletePlan = async(id) =>{
  const plan = await Plan.findByPk(id);
  if(!plan) return null
  await plan.destroy();
  return true;
};
