const { Event, User } = require('../models');

async function create(data) {
  return await Event.create(data);
}

async function read(filter = {}) {
  return await Event.findAll({
    where: filter,
    include: [
      {
        model: User,
        through: { attributes: [] }, 
        required: false
      }
    ]
  });
}

async function readOne(filter) {
  return await Event.findOne({
    where: filter,
    include: [
      {
        model: User,
        through: { attributes: [] },
        required: false
      }
    ]
  });
}

async function readEntityById(id) {
  return await Event.findByPk(id, {
    include: [
      {
        model: User,
        through: { attributes: [] },
        required: false
      }
    ]
  });
}

async function update(id, updatedData) {
  return await Event.update(updatedData, { where: { id } });
}

async function deleteById(id) {
  return await Event.destroy({ where: { id } });
}

async function getAll() {
  return await Event.findAll({
    include: [
      {
        model: User,
        through: { attributes: [] },
        required: false
      }
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
