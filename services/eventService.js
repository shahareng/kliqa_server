const EventController = require('../controllers/eventsController');

class EventService {
  async createEvent(data) {
    try {
      this.#validateEventData(data);
      await this.#checkForDuplicateEvent(data);
      return await EventController.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getEventById(id) {
    return await EventController.readEntityById(id);
  }

  async updateEvent(id, updatedData) {
    const event = await EventController.readEntityById(id);
    if (!event) return null;
    await event.update(updatedData);
    return event;
  }

  async deleteEvent(id) {
    const event = await EventController.readEntityById(id);
    if (!event) return false;
    await event.destroy();
    return true;
  }

  async getAllEvents() {
    return await EventController.readAll();
  }

  #validateEventData(data) {
    if (!data.event_name || !data.event_date || !data.location) {
      throw new Error('Missing required fields');
    }

    if (new Date(data.event_date) < new Date()) {
      throw new Error('Event date must be in the future');
    }
  }

  async #checkForDuplicateEvent(data) {
    const existing = await EventController.readOne({
      event_name: data.event_name,
      event_date: data.event_date,
      location: data.location,
    });

    if (existing) {
      throw new Error('Event already exists at this date and location');
    }
  }
}

module.exports = new EventService();
