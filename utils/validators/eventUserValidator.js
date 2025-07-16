const EventUserController = require('../../controllers/eventUsersController');

module.exports = {
  async validateEventUser(data) {
    if (!data.event_id || !data.user_id) {
      throw new Error('Missing required fields: event_id and user_id');
    }

    const existing = await EventUserController.readOne({
      event_id: data.event_id,
      user_id: data.user_id
    });

    if (existing) {
      throw new Error('This user is already assigned to this event');
    }
  }
};
