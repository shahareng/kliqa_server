const CommunityValueController = require('../controllers/communityValueController');

class CommunityValueService {
  async createCommunityValue(data) {
    try {
      this.#validateData(data);
      return await CommunityValueController.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCommunityValueById(id) {
    return await CommunityValueController.readEntityById(id);
  }

  async updateCommunityValue(id, updatedData) {
    const value = await CommunityValueController.readEntityById(id);
    if (!value) return null;
    await value.update(updatedData);
    return value;
  }

  async deleteCommunityValue(id) {
    const value = await CommunityValueController.readEntityById(id);
    if (!value) return false;
    await value.destroy();
    return true;
  }

  async getAllCommunityValues() {
    return await CommunityValueController.readAll();
  }

  #validateData(data) {
    if (!data.name) throw new Error('Missing required field: name');
  }
}

module.exports = new CommunityValueService();
