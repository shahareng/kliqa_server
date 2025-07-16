const { Groups, User } = require('../models');

async function createGroup(data) {
  return await Groups.create(data);
}

async function addUserToGroup(group_id, user_id) {
  const group = await Groups.findByPk(group_id);
  const user = await User.findByPk(user_id);
  if (!group || !user) throw new Error('Group or User not found');
  await group.addUser(user);
}

async function getAllGroups() {
  return await Groups.findAll({
    include: {
      model: User,
      through: { attributes: [] }
    }
  });
}


async function getGroupWithUsers(group_id) {
  return await Groups.findByPk(group_id, {
    include: { model: User, through: { attributes: [] } }
  });
}

async function removeUserFromGroup(group_id, user_id) {
  const group = await Groups.findByPk(group_id);
  const user = await User.findByPk(user_id);
  if (!group || !user) throw new Error('Group or User not found');
  await group.removeUser(user);
}

async function deleteGroup(group_id) {
  const group = await Groups.findByPk(group_id);
  if (!group) throw new Error('Group not found');
  await group.setUsers([]); 
  await group.destroy();    
}

module.exports = {
  createGroup,
  addUserToGroup,
  getGroupWithUsers,
  removeUserFromGroup,
  deleteGroup,
  getAllGroups
};
