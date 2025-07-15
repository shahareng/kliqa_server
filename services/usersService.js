const UserController = require('../controllers/userscontroller');

class UserService {
  async createUser(data) {
    this.#validateUserData(data);
    await this.#checkForDuplicateEmail(data.email);
    return await UserController.create(data);
  }

  async getUserById(id) {
    return await UserController.readEntityById(id);
  }

  async updateUser(id, updatedData) {
    const user = await UserController.readEntityById(id);
    if (!user) return null;
    await user.update(updatedData);
    return user;
  }

  async deleteUser(id) {
    const user = await UserController.readEntityById(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }

  async getAllUsers() {
    return await UserController.getAll();
  }

  #validateUserData(data) {
    if (!data.first_name || !data.last_name || !data.password) {
      throw new Error('Missing required fields');
    }

    if (data.email && !this.#isValidEmail(data.email)) {
      throw new Error('Invalid email format');
    }
  }

  async #checkForDuplicateEmail(email) {
    if (!email) return;
    const existing = await UserController.readOne({ email });
    if (existing) {
      throw new Error('User with this email already exists');
    }
  }

  #isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

module.exports = new UserService();
