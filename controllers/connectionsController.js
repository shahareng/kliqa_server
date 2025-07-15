const Connection = require('../models/connections');

async function create(data) {
  return await Connection.create(data);
}

async function read(filter = {}) {
  return await Connection.findAll({ where: filter });
}

async function readOne(filter) {
  return await Connection.findOne({ where: filter });
}

async function readEntityById(id) {
  return await Connection.findByPk(id);
}

async function update(id, updatedData) {
  return await Connection.update(updatedData, { where: { match_id: id } });
}

async function deleteById(id) {
  return await Connection.destroy({ where: { match_id: id } });
}

async function getAll() {
  return await Connection.findAll();
}

module.exports = {
  create,
  read,
  readOne,
  update,
  deleteById,
  getAll,
  readEntityById
};
