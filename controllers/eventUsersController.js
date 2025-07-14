const EventUser = require('../models/event_users');

async function create(data) {
  return await EventUser.create(data);
}

async function read(filter = {}) {
  return await EventUser.findAll({ where: filter });
}

async function readOne(filter) {
  return await EventUser.findOne({ where: filter });
}

async function getEntityById({ event_id, user_id }) {
  return await EventUser.findOne({ where: { event_id, user_id } });
}

async function update({ event_id, user_id }, updatedData) {
  return await EventUser.update(updatedData, {
    where: { event_id, user_id }
  });
}

async function deleteById({ event_id, user_id }) {
  return await EventUser.destroy({
    where: { event_id, user_id }
  });
}

async function getAll() {
  return await EventUser.findAll();
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
