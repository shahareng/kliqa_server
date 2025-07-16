const { User, JobsHistory, Connection, Event, CommunityValue } = require('../models');

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
  return await User.findByPk(id, {
    include: [
      { model: JobsHistory, required: false },
      { model: Connection, as: 'initiatedConnections', required: false },
      { model: Connection, as: 'receivedConnections', required: false },
      { model: Event, through: { attributes: [] }, required: false },
      { model: CommunityValue, required: false }
    ]
  });
}

async function update(id, updatedData) {
  return await User.update(updatedData, { where: { id } });
}

async function deleteById(id) {
  return await User.destroy({ where: { id } });
}

async function readAll() {
  return await User.findAll({
    include: [
      { model: JobsHistory, required: false },
      { model: Connection, as: 'initiatedConnections', required: false },
      { model: Connection, as: 'receivedConnections', required: false },
      { model: Event, through: { attributes: [] }, required: false },
      { model: CommunityValue, required: false }
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
