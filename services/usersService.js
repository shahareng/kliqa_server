const UserController = require('../controllers/userscontroller');
const { userValidator, commonValidator } = require('../utils/validators');
const { validatePositiveInteger } = require('../utils/validators/commonValidator');
const { validateUserData, checkForDuplicateEmail, checkForDuplicatePhone } = require('../utils/validators/userValidator');

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

  
}

module.exports = new UserService();
