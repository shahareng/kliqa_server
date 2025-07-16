module.exports = {
  validatePositiveInteger(id, fieldName = 'ID') {
    console.log("validatePositiveInteger"+id);
    const value = Number(id);
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error(`Invalid ${fieldName}: must be a positive integer`);
    }
  }
};
