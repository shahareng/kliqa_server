const ConnectionController = require('../controllers/connectionsController');
const usersController = require('../controllers/userscontroller');

class ConnectionService {
  async createConnection(data) {
    try {
      await this.#validateConnectionData(data);
      await this.#checkIfUsersAreDifferent(data);
      return await ConnectionController.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getConnectionById(id) {
    return await ConnectionController.readEntityById(id);
  }

  async updateConnection(id, updatedData) {
    const connection = await ConnectionController.readEntityById(id);
    if (!connection) return null;
    await connection.update(updatedData);
    return connection;
  }

  async deleteConnection(id) {
    const connection = await ConnectionController.readEntityById(id);
    if (!connection) return false;
    await connection.destroy();
    return true;
  }

  async getAllConnections() {
    return await ConnectionController.readAll();
  }

  async #validateConnectionData(data) {
    const requiredFields = ['user_id1', 'user_id2', 'connection_date'];
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (isNaN(Date.parse(data.connection_date))) {
      throw new Error('Invalid connection date');
    }

    const [user1, user2] = await Promise.all([
      usersController.readEntityById(data.user_id1),
      usersController.readEntityById(data.user_id2)
    ]);

    if (!user1) {
      throw new Error(`User with id ${data.user_id1} does not exist`);
    }
    if (!user2) {
      throw new Error(`User with id ${data.user_id2} does not exist`);
    }
  }

  async #checkIfUsersAreDifferent(data) {
    if (data.user_id1 === data.user_id2) {
      throw new Error('Cannot create connection between the same user');
    }
  }
}

module.exports = new ConnectionService();
