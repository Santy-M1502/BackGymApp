const History = require('../models/history');
const User = require('../models/user');
const Exercise = require('../models/exercise');

exports.getAllHistorys = async () => {
  return await History.findAll({
    include: [User, Exercise]
  });
};

exports.getHistoryById = async (id) => {
  return await History.findByPk(id, {
    include: [User, Exercise]
  });
};

exports.getHistoryByUserId = async (userId) => {
  return await History.findAll({
    where: { userId },
    include: [Exercise]
  });
};

exports.getHistoryByExerciseId = async (exerciseId) => {
  return await History.findAll({
    where: { exerciseId },
    include: [User]
  });
};

exports.createHistory = async (data) => {
  return await History.create(data);
};

exports.updateHistory = async (id, data) =>{
  const history = await History.findByPk(id);
  if(!history) return null;
  return await history.update(data)
};

exports.deleteHistory = async(id) =>{
  const history = await History.findByPk(id);
  if(!history) return null
  await history.destroy();
  return true;
};
