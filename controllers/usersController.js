const User = require('../models/users');

async function create(data) {
  return await User.create(data);
}

async function read(filter = {}) {
  return await User.findAll({ where: filter });
}

async function readOne(filter) {
  return await User.findOne({ where: filter });
}

async function readEntityById(id) {
  return await User.findByPk(id);
}

async function update(id, updatedData) {
  return await User.update(updatedData, { where: { id } });
}

async function deleteById(id) {
  return await User.destroy({ where: { id } });
}

async function getAll() {
  return await User.findAll();
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
