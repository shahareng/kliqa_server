function validateUserData(data) {
  if (!data.first_name || !data.last_name) {
    throw new Error('Missing required fields');
  }
}

async function checkForDuplicateEmail(email, UserController) {
  if (!email) return;
  const existing = await UserController.readOne({ email });
  if (existing) {
    throw new Error('User with this email already exists');
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
async function checkForDuplicatePhone(phone, UserController) {
  if (!phone) return;

  console.log(`[checkForDuplicatePhone] Checking if phone exists: ${phone}`);

  const existing = await UserController.readOne({ phone });

  if (existing) {
    console.log(`[checkForDuplicatePhone] Duplicate phone found for user ID: ${existing.id}`);
    throw new Error('User with this phone already exists');
  }

  console.log(`[checkForDuplicatePhone] Phone is unique`);
}

module.exports = {
  validateUserData,
  checkForDuplicateEmail,
  isValidEmail,
  checkForDuplicatePhone
};
