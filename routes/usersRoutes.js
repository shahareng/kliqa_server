const express = require('express');
const router = express.Router();
const userService = require('../services/usersService');


// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Get specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Create a new user
router.post('/add', async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Update user
router.put('/update/:id', async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Delete user
router.delete('/delete/:id', async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

router.post('/add-user-event/:user_id/:event_id', async (req, res) => {
  try {
    const { user_id, event_id } = req.params;
    await userService.addUserToEvent(user_id, event_id);
    res.status(201).send('User added to event successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post('/add-user-group/:user_id/:group_id', async (req, res) => {
  try {
    const { user_id, group_id } = req.params;
    await userService.addUserToGroup(user_id, group_id);
    res.status(201).send('User added to group successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
