const express = require('express');
const router = express.Router();
const connectionService = require('../services/connectionService');

// Get all connections
router.get('/', async (req, res) => {
  try {
    const connections = await connectionService.getAllConnections();
    res.status(200).send(connections);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Get specific connection by match_id
router.get('/:id', async (req, res) => {
  try {
    const connection = await connectionService.getConnectionById(req.params.id);
    res.status(200).send(connection);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Create a new connection
router.post('/add', async (req, res) => {
  try {
    const newConnection = await connectionService.createConnection(req.body);
    res.status(201).send(newConnection);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Update connection
router.put('/update/:id', async (req, res) => {
  try {
    const updatedConnection = await connectionService.updateConnection(req.params.id, req.body);
    res.status(200).send(updatedConnection);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Delete connection
router.delete('/delete/:id', async (req, res) => {
  try {
    await connectionService.deleteConnection(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

module.exports = router;
