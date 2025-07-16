const JobsHistoryController = require('../controllers/jobsHistoryController');
const { validatePositiveInteger } = require('../utils/validators/commonValidator');
const { validateJobData } = require('../utils/validators/jobHistoryValidator');

class JobsHistoryService {
  async createJobHistory(data) {
    try {
      validateJobData(data);
      return await JobsHistoryController.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getJobHistoryById(id) {
    validatePositiveInteger(id, 'id');
    return await JobsHistoryController.readEntityById(id);
  }

  async updateJobHistory(id, updatedData) {
    validatePositiveInteger(id, 'id');
    const job = await JobsHistoryController.readEntityById(id);
    if (!job) return null;
    await job.update(updatedData);
    return job;
  }

  async deleteJobHistory(id) {
    validatePositiveInteger(id, 'id');
    const job = await JobsHistoryController.readEntityById(id);
    if (!job) return false;
    await job.destroy();
    return true;
  }

  async getAllJobsHistory() {
    return await JobsHistoryController.readAll();
  }
}

module.exports = new JobsHistoryService();
