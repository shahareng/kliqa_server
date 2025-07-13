const express = require('express'),
app = express(),
PORT = 2500,
cors = require('cors')


app.use(cors())
app.use(express.json())


app.listen(PORT, ()=>console.log('#### Server is up ####'))
