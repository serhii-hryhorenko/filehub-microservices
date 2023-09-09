export const INVALID_EMAIL = 'invalid email';
export const INVALID_PASSWORD = 'invalid password';
export const PASSWORD_DONT_MATCH = 'passwords do not match';
export const REGISTRATION_SUCCESSFUL = 'registration successful';

const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

/**
 * Validates email by minimal length and default regex.
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  if (typeof (email) === 'string') {
    return email.length > 5 && emailRegex.test(email.toLowerCase());
  }

  return false;
};

/**
 * Validates password by length.
 * @param {string} password
 * @returns {boolean}
 */
export const validatePassword = (password) => {
  if (typeof (password) === 'string') {
    return password.length > 6;
  }

  return false;
};
