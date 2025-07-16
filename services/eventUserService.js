const EventUserController = require('../controllers/eventUsersController');
const { validateEventUser } = require('../utils/validators/eventUserValidator');

class EventUserService {
  async createEventUser(data) {
    try {
      validateEventUser(data);
      return await EventUserController.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getEventUser(event_id, user_id) {
    return await EventUserController.readEntityById({ event_id, user_id });
  }

  async updateEventUser(event_id, user_id, updatedData) {
    const record = await this.getEventUser(event_id, user_id);
    if (!record) return null;
    await record.update(updatedData);
    return record;
  }

  async deleteEventUser(event_id, user_id) {
    const record = await this.getEventUser(event_id, user_id);
    if (!record) return false;
    await record.destroy();
    return true;
  }

  async getAllEventUsers() {
    return await EventUserController.readAll();
  }
}

module.exports = new EventUserService();
