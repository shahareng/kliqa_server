module.exports = {
  validateCommunityValue(data) {
    if (!data.name) {
      throw new Error('Missing required field: name');
    }
  }
};
