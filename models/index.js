const sequelize = require('../db/connection');

const User = require('./users'),
      Event = require('./events'),
      EventUser = require('./event_users');
      JobHistory = require('./jobs_history');
      Connection = require('./connections');
      CommunityValue = require('./community_value');

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

User.hasMany(JobHistory, { foreignKey: 'user_id' });
JobHistory.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Connection, { foreignKey: 'user_id1', as: 'initiatedConnections' });
User.hasMany(Connection, { foreignKey: 'user_id2', as: 'receivedConnections' });
Connection.belongsTo(User, { foreignKey: 'user_id1', as: 'initiator' });
Connection.belongsTo(User, { foreignKey: 'user_id2', as: 'receiver' });

CommunityValue.hasMany(User, { foreignKey: 'community_value' });
User.belongsTo(CommunityValue, { foreignKey: 'community_value' });

module.exports = {
  sequelize,
  User,
  Event,
  EventUser,
  JobHistory,
  Connection,
  CommunityValue,
};
