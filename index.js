require('dotenv').config();

const express = require('express'),
  app = express(),
  PORT = 2500,
  cors = require('cors')
app.use(cors())
app.use(express.json())

const { sequelize } = require('./models');
const cvUploadRoutes = require('./routes/cvUploadRoutes');



app.use('/upload', require('./routes/uploadRoutes'));
app.use('/upload', cvUploadRoutes);
app.use('/auth', require('./auth/authRoutes'));
app.use('/events', require('./routes/eventRoutes'));
app.use('/users', require('./routes/usersRoutes'));
app.use('/connections', require('./routes/connectionsRouter'));
app.use('/jobs_history', require('./routes/jobsHistoryRouter'));
app.use('/event_users', require('./routes/eventUsersRouter'));
app.use('/community_values',  require('./routes/communityValueRoutes'));
app.use('/groups', require('./routes/groupRoutes'));




sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to DB:', err);
  });
