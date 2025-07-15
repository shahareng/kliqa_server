const CommunityValueController = require('../controllers/communityValueController');

class CommunityValueService {
  async createCommunityValue(data) {
    this.#validateData(data);
    return await CommunityValueController.create(data);
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
    return await CommunityValueController.getAll();
  }

  #validateData(data) {
    if (!data.name) throw new Error('Missing required field: name');
  }
}

module.exports = new CommunityValueService();
