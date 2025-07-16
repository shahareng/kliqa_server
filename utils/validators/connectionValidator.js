const usersController = require('../../controllers/userscontroller');

module.exports = {
  async validateConnectionData(data) {
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

    if (data.user_id1 === data.user_id2) {
      throw new Error('Cannot create connection between the same user');
    }
  }
};
