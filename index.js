require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 2500;
const cors = require('cors');

const { sequelize } = require('./models');

app.use(cors());
app.use(express.json());

app.use('/events', require('./routes/eventRoutes'));

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
