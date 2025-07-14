const { Event } = require('../models');

class EventService {
  async createEvent(data) {
    return await Event.create(data);
  }

  async getEventById(id) {
    return await Event.findByPk(id);
  }

  async updateEvent(id, updatedData) {
    const event = await Event.findByPk(id);
    if (!event) return null;
    await event.update(updatedData);
    return event;
  }

  async deleteEvent(id) {
    const event = await Event.findByPk(id);
    if (!event) return false;
    await event.destroy();
    return true;
  }

  async getAllEvents() {
    return await Event.findAll();
  }
}

module.exports = new EventService();
