<<<<<<< HEAD


const express = require('express'),
app = express(),
PORT = 2500,
cors = require('cors')
const authRoutes = require('./auth/authRoutes');

=======
require('dotenv').config();
>>>>>>> 54498c5c85a736b98d6ea1e96856a70f3bb2f850

const express = require('express');
const app = express();
const PORT = 2500;
const cors = require('cors');

<<<<<<< HEAD
app.use(cors())
app.use(express.json())
app.use(authRoutes);

=======
const { sequelize } = require('./models');
>>>>>>> 54498c5c85a736b98d6ea1e96856a70f3bb2f850

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.listen(PORT, ()=>console.log('#### Server is up ####'))


=======
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
>>>>>>> 54498c5c85a736b98d6ea1e96856a70f3bb2f850
