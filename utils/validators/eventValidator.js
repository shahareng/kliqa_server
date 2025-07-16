const EventController = require('../../controllers/eventsController');

module.exports = {
  validateEventData(data) {
    if (!data.event_name || !data.event_date || !data.location) {
      throw new Error('Missing required fields: event_name, event_date or location');
    }

    if (new Date(data.event_date) < new Date()) {
      throw new Error('Event date must be in the future');
    }
  },

  async checkForDuplicateEvent(data) {
    const existing = await EventController.readOne({
      event_name: data.event_name,
      event_date: data.event_date,
      location: data.location,
    });

    if (existing) {
      throw new Error('Event already exists at this date and location');
    }
  }
};
