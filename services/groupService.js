const groupController = require('../controllers/groupController');

class GroupService {
  async createGroup(data) {
    return await groupController.createGroup(data);
  }

  async addUserToGroup(group_id, user_id) {
    return await groupController.addUserToGroup(group_id, user_id);
  }

  async getAllGroups() {
    return await groupController.getAllGroups();
  }
  async getGroupById(group_id) {
    return await groupController.getGroupWithUsers(group_id);
  }

  async removeUserFromGroup(group_id, user_id) {
  return await groupController.removeUserFromGroup(group_id, user_id);
}

    async deleteGroup(group_id) {
        return await groupController.deleteGroup(group_id);
    }

}

module.exports = new GroupService();
