const UserController = require('../controllers/userscontroller');
const { User } = require('../models');
const { userValidator, commonValidator } = require('../utils/validators');
const { validatePositiveInteger } = require('../utils/validators/commonValidator');
const { validateUserData, checkForDuplicateEmail, checkForDuplicatePhone } = require('../utils/validators/userValidator');
const eventService = require('./eventService');

class UserService {
  async createUser(data) {
   try {
    validateUserData(data);
    await checkForDuplicateEmail(data.email, UserController);
    await checkForDuplicatePhone(data.phone, UserController);
    return await UserController.create(data);
  } catch (error) {
    console.log("createUser  "+error);
      throw error; 
  }
  }

  async getUserById(id) {
    validatePositiveInteger(id, 'id');
    return await UserController.readEntityById(id);
  }

  async updateUser(id, updatedData) {
    validatePositiveInteger(id, 'id');
    const user = await UserController.readEntityById(id);
    if (!user) return null;
    await user.update(updatedData);
    return user;
  }

  async deleteUser(id) {
    validatePositiveInteger(id, 'id');
    const user = await UserController.readEntityById(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }

  async getAllUsers() {
    return await UserController.readAll();
  }
async addUserToEvent(user_id, event_id) {
    const user = await this.getUserById(user_id);
    const event = await eventService.getEventById(event_id);

    if (!user || !event) {
      throw new Error('User or event not found');
    }

    await user.addEvent(event);
  }
  
}

module.exports = new UserService();
