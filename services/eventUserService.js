const EventUserController = require('../controllers/eventUsersController');

class EventUserService {
  async createEventUser(data) {
    this.#validateData(data);
    await this.#checkDuplicate(data);
    return await EventUserController.create(data);
  }

  async getEventUser(event_id, user_id) {
    return await EventUserController.getEntityById({ event_id, user_id });
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
    return await EventUserController.getAll();
  }

  #validateData(data) {
    if (!data.event_id || !data.user_id) {
      throw new Error('Missing required fields: event_id and user_id');
    }
  }

  async #checkDuplicate(data) {
    const existing = await EventUserController.readOne({
      event_id: data.event_id,
      user_id: data.user_id
    });
    if (existing) {
      throw new Error('This user is already assigned to this event');
    }
  }
}

module.exports = new EventUserService();
