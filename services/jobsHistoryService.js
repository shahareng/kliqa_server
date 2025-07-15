const JobsHistoryController = require('../controllers/jobsHistoryController');

class JobsHistoryService {
  async createJobHistory(data) {
    try {
      this.#validateJobData(data);
      return await JobsHistoryController.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getJobHistoryById(id) {
    return await JobsHistoryController.readEntityById(id);
  }

  async updateJobHistory(id, updatedData) {
    const job = await JobsHistoryController.readEntityById(id);
    if (!job) return null;
    await job.update(updatedData);
    return job;
  }

  async deleteJobHistory(id) {
    const job = await JobsHistoryController.readEntityById(id);
    if (!job) return false;
    await job.destroy();
    return true;
  }

  async getAllJobsHistory() {
    return await JobsHistoryController.readAll();
  }

  #validateJobData(data) {
    const requiredFields = ['company_id', 'start_date', 'user_id', 'job_title'];
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (data.end_date && data.start_date && new Date(data.end_date) < new Date(data.start_date)) {
      throw new Error('End date must be after start date');
    }
  }
}

module.exports = new JobsHistoryService();
