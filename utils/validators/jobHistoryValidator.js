module.exports = {
  validateJobData(data) {
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
};
