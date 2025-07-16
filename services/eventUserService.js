const EventUserController = require('../controllers/eventUsersController');
const { validateEventUser } = require('../utils/validators/eventUserValidator');

class EventUserService {
 
  async getEventUser(event_id, user_id) {
    return await EventUserController.readEntityById({ event_id, user_id });
  }
    async getEventById(event_id) {
        return await EventUserController.findByEventId(event_id);
    }
    async getUserById(user_id) {
        return await EventUserController.findByUserId( user_id );
    }

  async getAllEventUsers() {
    return await EventUserController.readAll();
  }
}

module.exports = new EventUserService();
