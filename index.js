require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 2500;
const cors = require('cors');

const { sequelize } = require('./models');

app.use(cors());
app.use(express.json());

app.use('/events', require('./routes/eventRoutes'));
app.use('/users', require('./routes/usersRoutes'));
app.use('/connections', require('./routes/connectionsRouter'));
app.use('/jobs_history', require('./routes/jobsHistoryRouter'));
app.use('/event_users', require('./routes/eventUsersRouter'));

sequelize.authenticate()
  .then(() => {
    console.log('🔗 Connected to MySQL database');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to DB:', err);
  });
