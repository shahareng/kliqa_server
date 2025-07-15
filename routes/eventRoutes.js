const express = require('express');
const router = express.Router();
const eventService = require('../services/eventService');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).send(events);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Get specific event by ID
router.get('/:eventId', async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.eventId);
    res.status(200).send(event);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Create a new event
router.post('/add', async (req, res) => {
  try {
    const newEvent = await eventService.createEvent(req.body);
    res.status(201).send(newEvent);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Update event
router.put('/update/:id', async (req, res) => {
  try {
    const updatedEvent = await eventService.updateEvent(req.params.id, req.body);
    res.status(200).send(updatedEvent);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Delete event
router.delete('/delete/:id', async (req, res) => {
  try {
    await eventService.deleteEvent(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

module.exports = router;
