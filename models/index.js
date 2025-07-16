const sequelize = require('../db/connection');

const User = require('./users'),
      Event = require('./events'),
      EventUser = require('./event_users'),
      JobsHistory = require('./jobs_history'),
      Connection = require('./connections'),
      CommunityValue = require('./community_value'),
      Groups = require('./community_group'),
      GroupUser = require('./group_users');

// Associations
User.belongsToMany(Event, {
  through: EventUser,
  foreignKey: 'user_id',
  otherKey: 'event_id',
});
Event.belongsToMany(User, {
  through: EventUser,
  foreignKey: 'event_id',
  otherKey: 'user_id',
});
EventUser.belongsTo(User, { foreignKey: 'user_id' });
EventUser.belongsTo(Event, { foreignKey: 'event_id' });

User.hasMany(EventUser, { foreignKey: 'user_id' });
Event.hasMany(EventUser, { foreignKey: 'event_id' });
User.hasMany(JobsHistory, { foreignKey: 'user_id' });
JobsHistory.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Connection, { foreignKey: 'user_id1', as: 'initiatedConnections' });
User.hasMany(Connection, { foreignKey: 'user_id2', as: 'receivedConnections' });
Connection.belongsTo(User, { foreignKey: 'user_id1', as: 'initiator' });
Connection.belongsTo(User, { foreignKey: 'user_id2', as: 'receiver' });

CommunityValue.hasMany(User, { foreignKey: 'community_value' });
User.belongsTo(CommunityValue, { foreignKey: 'community_value' });

User.belongsToMany(Groups, {
  through: GroupUser,
  foreignKey: 'user_id',
  otherKey: 'group_id',
});
Groups.belongsToMany(User, {
  through: GroupUser,
  foreignKey: 'group_id',
  otherKey: 'user_id',
});
GroupUser.belongsTo(User, { foreignKey: 'user_id' });
GroupUser.belongsTo(Groups, { foreignKey: 'group_id' });

User.hasMany(GroupUser, { foreignKey: 'user_id' });
Groups.hasMany(GroupUser, { foreignKey: 'group_id' });

module.exports = {
  sequelize,
  User,
  Event,
  EventUser,
  JobsHistory,
  Connection,
  CommunityValue,
  Groups,
  GroupUser
};
