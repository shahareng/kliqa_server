const express = require('express');
const router = express.Router();
const jobsHistoryService = require('../services/jobsHistoryService');

// Get all job history records
router.get('/', async (req, res) => {
  try {
    const jobs = await jobsHistoryService.getAllJobsHistory();
    res.status(200).send(jobs);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Get job history by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await jobsHistoryService.getJobHistoryById(req.params.id);
    res.status(200).send(job);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Create new job history
router.post('/add', async (req, res) => {
  try {
    const newJob = await jobsHistoryService.createJobHistory(req.body);
    res.status(201).send(newJob);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Update job history
router.put('/update/:id', async (req, res) => {
  try {
    const updatedJob = await jobsHistoryService.updateJobHistory(req.params.id, req.body);
    res.status(200).send(updatedJob);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

// Delete job history
router.delete('/delete/:id', async (req, res) => {
  try {
    await jobsHistoryService.deleteJobHistory(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(error.code ?? 400).send(error.message);
  }
});

module.exports = router;
