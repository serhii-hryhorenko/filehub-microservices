import {
  validateEmail,
  validatePassword,
  INVALID_EMAIL,
  INVALID_PASSWORD, PASSWORD_DONT_MATCH, REGISTRATION_SUCCESSFUL,

} from './validation.js';

export const emailValidator = async (email) => {
  if (validateEmail(email)) {
    return email;
  }

  throw new Error(INVALID_EMAIL);
};

export const passwordValidator = async (password) => {
  if (validatePassword(password)) {
    return password;
  }

  throw new Error(INVALID_PASSWORD);
};

export const confirmPasswordValidator = (getPassword) =>
  async (confirmedPassword) => {
    if (confirmedPassword === getPassword()) {
      return REGISTRATION_SUCCESSFUL;
    }

    throw new Error(PASSWORD_DONT_MATCH);
  };
