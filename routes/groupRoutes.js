const express = require('express');
const router = express.Router();
const groupService = require('../services/groupService');

router.post('/add', async (req, res) => {
  try {
    const group = await groupService.createGroup(req.body);
    res.status(201).send(group);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/add/:group_id/:user_id', async (req, res) => {
  try {
    await groupService.addUserToGroup(req.params.group_id, req.params.user_id);
    res.status(200).send('User added to group');
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.get('/', async (req, res) => {
  try {
    const group = await groupService.getAllGroups();
    res.status(200).send(group);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.get('/:group_id', async (req, res) => {
  try {
    const group = await groupService.getGroupById(req.params.group_id);
    res.status(200).send(group);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.delete('/delete/:group_id', async (req, res) => {
  try {
    await groupService.deleteGroup(req.params.group_id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/remove/:group_id/:user_id', async (req, res) => {
  try {
    await groupService.removeUserFromGroup(req.params.group_id, req.params.user_id);
    res.status(200).send('User removed from group');
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
