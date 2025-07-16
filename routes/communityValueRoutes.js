const express = require('express');
const router = express.Router();
const service = require('../services/communityValueService');

router.get('/', async (req, res) => {
  try {
    const all = await service.getAllCommunityValues();
    res.status(200).send(all);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const entity = await service.getCommunityValueById(req.params.id);
    res.status(200).send(entity);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

router.post('/add', async (req, res) => {
  try {
    const newEntity = await service.createCommunityValue(req.body);
    res.status(201).send(newEntity);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const updated = await service.updateCommunityValue(req.params.id, req.body);
    res.status(200).send(updated);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await service.deleteCommunityValue(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

module.exports = router;
