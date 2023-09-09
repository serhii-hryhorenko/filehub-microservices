import {afterEach, describe, test, expect} from '@jest/globals';
import {AuthForm} from '../../../src/components/auth-form.js';
import {innerHtml, expectErrorsWithTimeout} from '../../util/markup-validation.js';
import {clearDocumentBody} from '../../util/setup-callbacks.js';

const formControlsParameters = ['Email', 'Password'];

/**
 * Creates a new form component in document's body, fill with a given data and submit it.
 * @param {string[]} inputData
 */
function fillAndSubmitForm(inputData) {
  const registrationForm = new AuthForm(document.body);

  registrationForm.inputs.forEach((input, index) => input.value = inputData[index]);

  const button = document.getElementsByTagName('button').item(0);
  button.click();
}

describe('Authentication form test', () => {
  afterEach(clearDocumentBody);

  test('Should properly initialize registration form component', () => {
    const authForm = new AuthForm(document.body);

    const renderedAuthForm = document.body.firstElementChild;

    expect(authForm.formControls.length).toBe(2);
    expect(authForm.inputs.length).toBe(2);

    authForm.formControls.forEach((formControl, index) => {
      expect(formControl.label).toBe(formControlsParameters[index]);
    });

    const submitButton = renderedAuthForm.getElementsByTagName('button').item(0);
    expect(innerHtml(submitButton)).toBe('Sign In');

    const redirectMessage = document.getElementsByTagName('a').item(0);
    expect(innerHtml(redirectMessage)).toBe('Don\'t have an account yet?');
  });

  test('Should successfully validate input values', () => {
    fillAndSubmitForm(['hryhorenkoser@gmail.com', 'wasdasd']);
    expectErrorsWithTimeout(0);
  });

  test('Should invalidate email', () => {
    fillAndSubmitForm(['hryhorenkosergmail.com', 'wasdasd']);
    expectErrorsWithTimeout(1);
  });

  test('Should invalidate password', () => {
    fillAndSubmitForm(['hryhorenkoser@gmail.com', '123']);
    expectErrorsWithTimeout(1);
  });

  test('Should invalidate all inputs', () => {
    fillAndSubmitForm(['hryhorenkosergmail.com', '123']);
    expectErrorsWithTimeout(2);
  });
});
