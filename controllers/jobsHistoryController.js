const { JobsHistory, User } = require('../models');

async function create(data) {
  return await JobsHistory.create(data);
}

async function read(filter = {}) {
  return await JobsHistory.findAll({
    where: filter,
    include: [
      { model: User, required: false }
    ]
  });
}

async function readOne(filter) {
  return await JobsHistory.findOne({
    where: filter,
    include: [
      { model: User, required: false }
    ]
  });
}

async function readEntityById(id) {
  return await JobsHistory.findByPk(id, {
    include: [
      { model: User, required: false }
    ]
  });
}

async function update(id, updatedData) {
  return await JobsHistory.update(updatedData, { where: { id } });
}

async function deleteById(id) {
  return await JobsHistory.destroy({ where: { id } });
}

async function readAll() {
  return await JobsHistory.findAll({
    include: [
      { model: User, required: false }
    ]
  });
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
