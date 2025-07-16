const { EventUser, User, Event } = require('../models');


async function read(filter = {}) {
  return await EventUser.findAll({
    where: filter,
    include: [
      { model: User },
      { model: Event }
    ]
  });
}

async function readOne(filter) {
  return await EventUser.findOne({
    where: filter,
    include: [
      { model: User },
      { model: Event }
    ]
  });
}

async function readEntityById({ event_id, user_id }) {
  return await EventUser.findOne({
    where: { event_id, user_id },
    include: [
      { model: User },
      { model: Event }
    ]
  });
}

async function update(id, updatedData) {
  return await EventUser.update(updatedData, { where: { id } });
}

async function deleteById(id) {
  return await EventUser.destroy({ where: { id } });
}

async function readAll() {
  return await EventUser.findAll({
    include: [
      { model: User },
      { model: Event }
    ]
  });
}
async function findByUserId(user_id) {
  return await EventUser.findAll({
    where: { user_id },
    include: [
      { model: User },
      { model: Event }
    ]
  });
}
async function findByEventId(event_id) {
  return await EventUser.findAll({
    where: { event_id },
    include: [
      { model: User },
      { model: Event }
    ]
  });
}

module.exports = {
  read,
  readOne,
  update,
  deleteById,
  readAll,
  readEntityById,
  findByUserId,
  findByEventId
};
