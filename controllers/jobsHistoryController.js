const JobsHistory = require('../models/jobs_history');

async function create(data) {
  return await JobsHistory.create(data);
}

async function read(filter = {}) {
  return await JobsHistory.findAll({ where: filter });
}

async function readOne(filter) {
  return await JobsHistory.findOne({ where: filter });
}

async function getEntityById(id) {
  return await JobsHistory.findByPk(id);
}

async function update(id, updatedData) {
  return await JobsHistory.update(updatedData, { where: { id } });
}

async function deleteById(id) {
  return await JobsHistory.destroy({ where: { id } });
}

async function getAll() {
  return await JobsHistory.findAll();
}

module.exports = {
  create,
  read,
  readOne,
  update,
  deleteById,
  getAll,
  getEntityById
};
