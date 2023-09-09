import {afterEach, describe, expect, test} from '@jest/globals';
import {RegistrationForm} from '../../../src/components/registration-form.js';
import {innerHtml, expectErrorsWithTimeout} from '../../util/markup-validation.js';
import {clearDocumentBody} from '../../util/setup-callbacks.js';

const formControlsLabels = ['Email', 'Password', 'Confirm Password'];

/**
 * Creates a new form component in document's body, fill with a given data and submit it.
 * @param {string[]} inputData
 */
function fillAndSubmitForm(inputData) {
  const registrationForm = new RegistrationForm(document.body);

  [...registrationForm.inputs].forEach((input, index) => input.value = inputData[index]);

  const button = document.getElementsByTagName('button').item(0);
  button.click();
}

describe('Registration form test', () => {
  afterEach(clearDocumentBody);

  test('Should properly initialize registration form component', () => {
    const registrationForm = new RegistrationForm(document.body);

    const renderedRegistrationForm = document.body.firstElementChild;

    expect(registrationForm.formControls.length).toBe(3);
    expect(registrationForm.inputs.length).toBe(3);

    registrationForm.formControls.forEach((formControl, index) => {
      expect(formControl.label).toBe(formControlsLabels[index]);
    });

    const submitButton = renderedRegistrationForm.getElementsByTagName('button').item(0);
    expect(innerHtml(submitButton)).toBe('Sign Up');

    const redirectMessage = document.getElementsByTagName('a').item(0);
    expect(innerHtml(redirectMessage)).toBe('Already have an account?');
  });

  test('Should successfully validate input values', () => {
    fillAndSubmitForm(['hryhorenkoser@gmail.com', 'wasdasd', 'wasdasd']);
    expectErrorsWithTimeout(0);
  });

  test('Should invalidate email', () => {
    fillAndSubmitForm(['hryhorenkosergmail.com', 'wasdasd', 'wasdasd']);
    expectErrorsWithTimeout(1);
  });

  test('Should invalidate password', () => {
    fillAndSubmitForm(['hryhorenkoser@gmail.com', '123', '123']);
    expectErrorsWithTimeout(1);
  });

  test('Should invalidate confirmed password', () => {
    fillAndSubmitForm(['hryhorenkoser@gmail.com', 'wasdasd', 'wasddsa']);
    expectErrorsWithTimeout(1);
  });

  test('Should invalidate all inputs', () => {
    fillAndSubmitForm(['hryhorenkosergmail.com', '123', '321']);
    expectErrorsWithTimeout(3);
  });
});
