const Event = require('../models/events');

async function create(data) {
  return await Event.create(data);
}

async function read(filter = {}) {
  return await Event.findAll({ where: filter });
}

async function readOne(filter) {
  return await Event.findOne({ where: filter });
}

async function update(id, data) {
  return await Event.update(data, { where: { id } });
}

async function del(id) {
  return await Event.destroy({ where: { id } });
}

module.exports = { create, read, readOne, update, del };
