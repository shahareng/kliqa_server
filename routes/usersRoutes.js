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
    const user = await userService.getUserById(req.params.userId);
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
    const updatedUser = await userService.updateUser(req.params.userId, req.body);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Delete user
router.delete('/delete/:id', async (req, res) => {
  try {
    await userService.deleteUser(req.params.userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

module.exports = router;
