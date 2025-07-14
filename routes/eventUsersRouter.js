const express = require('express');
const router = express.Router();
const eventUserService = require('../services/eventUserService');

// Get all event-user relations
router.get('/', async (req, res) => {
  try {
    const records = await eventUserService.getAllEventUsers();
    res.status(200).send(records);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Get a specific event-user relation
router.get('/:event_id/:user_id', async (req, res) => {
  try {
    const record = await eventUserService.getEventUser(
      req.params.event_id,
      req.params.user_id
    );
    res.status(200).send(record);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Create a new event-user relation
router.post('/', async (req, res) => {
  try {
    const newRelation = await eventUserService.createEventUser(req.body);
    res.status(201).send(newRelation);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Update event-user relation
router.put('/:event_id/:user_id', async (req, res) => {
  try {
    const updated = await eventUserService.updateEventUser(
      req.params.event_id,
      req.params.user_id,
      req.body
    );
    res.status(200).send(updated);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Delete event-user relation
router.delete('/:event_id/:user_id', async (req, res) => {
  try {
    await eventUserService.deleteEventUser(
      req.params.event_id,
      req.params.user_id
    );
    res.sendStatus(204);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

module.exports = router;
