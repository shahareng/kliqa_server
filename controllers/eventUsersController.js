const { EventUser, User, Event } = require('../models');

async function create(data) {
  return await EventUser.create(data);
}

async function read(filter = {}) {
  return await EventUser.findAll({
    where: filter,
    include: [
      { model: User, required: false },
      { model: Event, required: false }
    ]
  });
}

async function readOne(filter) {
  return await EventUser.findOne({
    where: filter,
    include: [
      { model: User, required: false },
      { model: Event, required: false }
    ]
  });
}

async function readEntityById({ event_id, user_id }) {
  return await EventUser.findOne({
    where: { event_id, user_id },
    include: [
      { model: User, required: false },
      { model: Event, required: false }
    ]
  });
}

async function update(id, updatedData) {
  return await EventUser.update(updatedData, { where: { id } });
}

async function deleteById(id) {
  return await EventUser.destroy({ where: { id } });
}

async function getAll() {
  return await EventUser.findAll({
    include: [
      { model: User, required: false },
      { model: Event, required: false }
    ]
  });
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
