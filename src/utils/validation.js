/**
 * Validate an email address structure.
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validate phone number format (must be 10 digits or typical country phone formats).
 * @param {string} phone
 * @returns {boolean}
 */
export const validatePhone = (phone) => {
  // Allow empty or simple 10 digit check
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
};

/**
 * Validate form query inputs.
 * @param {object} fields
 * @returns {object} errors - Validation errors
 */
export const validateQueryForm = (fields) => {
  const errors = {};

  if (!fields.name || !fields.name.trim()) {
    errors.name = 'Full name is required';
  } else if (fields.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters';
  }

  if (!fields.email || !fields.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!validateEmail(fields.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!fields.phone || !fields.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(fields.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }

  if (!fields.category) {
    errors.category = 'Please select a query category';
  }

  if (!fields.message || !fields.message.trim()) {
    errors.message = 'Message is required';
  } else if (fields.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
};
