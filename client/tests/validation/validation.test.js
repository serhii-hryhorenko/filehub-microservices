import {describe, expect, test} from '@jest/globals';
import {validateEmail, validatePassword} from '../../src/validation/validation.js';

describe('Email validation test', () => {
  test('Should invalidate incoming email.', () => {
    const invalidUserInput = [
      'foo',
      ' ',
      '',
      ['foo', 'bar'],
      null,
      undefined,
      {},
      3.14,
    ];

    invalidUserInput.forEach((input) => expect(validateEmail(input)).toBeFalsy());
  });

  test('Should successfully validate email.', () => {
    const validUserInput = [
      'hryhorenkoser@gmail.com',
      'serhii.hryhorenko@teamdev.com',
    ];

    validUserInput.forEach((input) => expect(validateEmail(input)).toBeTruthy());
  });
});

describe('Password validation test', () => {
  test('Should successfully validate password.', () => {
    const validPasswords = [
      'qwertyu',
      '123-QWE-pudge',
    ];

    validPasswords.forEach((password) => expect(validatePassword(password)).toBeTruthy());
  });

  test('Should invalidate incoming password.', () => {
    const invalidPasswords = [
      'pudge',
      'abc',
      '1234',
      [],
      {password: 'pass'},
      123,
    ];

    invalidPasswords.forEach((password) => expect(validatePassword(password)).toBeFalsy());
  });
});
