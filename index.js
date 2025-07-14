

const express = require('express'),
app = express(),
PORT = 2500,
cors = require('cors')
const authRoutes = require('./auth/authRoutes');



app.use(cors())
app.use(express.json())
app.use(authRoutes);



app.listen(PORT, ()=>console.log('#### Server is up ####'))


