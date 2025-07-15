const CommunityValue = require('../models/community_value');

async function create(data) {
  return await CommunityValue.create(data);
}

async function read(filter = {}) {
  return await CommunityValue.findAll({ where: filter });
}

async function readOne(filter) {
  return await CommunityValue.findOne({ where: filter });
}

async function readEntityById(id) {
  return await CommunityValue.findByPk(id);
}

async function update(id, updatedData) {
  return await CommunityValue.update(updatedData, { where: { id } });
}

async function deleteById(id) {
  return await CommunityValue.destroy({ where: { id } });
}

async function readAll() {
  return await CommunityValue.findAll();
}

module.exports = {
  create,
  read,
  readOne,
  update,
  deleteById,
  readAll,
  readEntityById
};
