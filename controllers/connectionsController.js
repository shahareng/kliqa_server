const { Connection, User } = require('../models');

async function create(data) {
  return await Connection.create(data);
}

async function read(filter = {}) {
  return await Connection.findAll({
    where: filter,
    include: [
      { model: User, as: 'initiator', required: false },
      { model: User, as: 'receiver', required: false }
    ]
  });
}

async function readOne(filter) {
  return await Connection.findOne({
    where: filter,
    include: [
      { model: User, as: 'initiator', required: false },
      { model: User, as: 'receiver', required: false }
    ]
  });
}

async function readEntityById(id) {
  return await Connection.findByPk(id, {
    include: [
      { model: User, as: 'initiator', required: false },
      { model: User, as: 'receiver', required: false }
    ]
  });
}

async function update(id, updatedData) {
  return await Connection.update(updatedData, { where: { id } }); 
}

async function deleteById(id) {
  return await Connection.destroy({ where: { id } }); 
}

async function readAll() {
  return await Connection.findAll({
    include: [
      { model: User, as: 'initiator', required: false },
      { model: User, as: 'receiver', required: false }
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
