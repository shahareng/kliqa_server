const Entity = require('../models/events');

async function create(data) {
  return await Entity.create(data);
}

async function read(filter = {}) {
  return await Entity.findAll({ where: filter });
}

async function readOne(filter) {
  return await Entity.findOne({ where: filter });
}


async function readEntityById(id) {
return await Entity.findByPk(id);
}

async function update(id, updatedData) {
return await Entity.update(updatedData, { where: { id } });
}

async function deleteById(id) {
return await Entity.destroy({ where: { id } });
}

async function readAll() {
return await Entity.findAll();
}
module.exports = { create, read, readOne, update, deleteById, readAll, readEntityById };
