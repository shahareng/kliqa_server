require('dotenv').config();

const express = require('express'),
  app = express(),
  PORT = 2500,
  cors = require('cors')
app.use(cors())
app.use(express.json())

const { sequelize } = require('./models');
const cvUploadRoutes = require('./routes/_cvUploadRoutes');




app.use('/upload', require('./routes/uploadRoutes'));
console.log('uploadRoutes', require('./routes/uploadRoutes'));

app.use('/upload', cvUploadRoutes);
console.log('cvUploadRoutes', require('./routes/_cvUploadRoutes'));

app.use('/auth', require('./auth/authRoutes'));
console.log('authRoutes', require('./auth/authRoutes'));

app.use('/events', require('./routes/eventRoutes'));
console.log('eventRoutes', require('./routes/eventRoutes'));


app.use('/users', require('./routes/usersRoutes'));
console.log('usersRoutes', require('./routes/usersRoutes'));

app.use('/connections', require('./routes/connectionsRouter'));
console.log('connectionsRouter', require('./routes/connectionsRouter'));


app.use('/jobs_history', require('./routes/jobsHistoryRouter'));
console.log('jobsHistoryRouter', require('./routes/jobsHistoryRouter'));


app.use('/event_users', require('./routes/eventUsersRouter'));
console.log('eventUsersRouter', require('./routes/eventUsersRouter'));




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
