import {afterEach, describe, test, expect} from '@jest/globals';
import {clearDocumentBody} from '../../util/setup-callbacks.js';
import {Form} from '../../../js/components/form.js';
import {ValidationConfig} from '../../../js/validation-config.js';
import {Link} from '../../../js/components/link.js';
import {Button} from '../../../js/components/button.js';

/**
 * Creates a dummy form component for testing.
 * @param {Element} parent
 * @returns {Form}
 */
function createTestForm(parent) {
  const form = new Form(parent,
      (parent) => new Button(parent, 'Click Me!'),
      (parent) => new Link(parent, {text: 'Go To', url: 'google.com'}),
      ValidationConfig.builder()
          .addField('login', () => new Promise((resolve) => resolve('valid login')))
          .addField('password', () => new Promise((resolve, reject) => reject(new Error('failed'))))
          .build());

  form._init();

  return form;
}

describe('Form component test', () => {
  afterEach(clearDocumentBody);

  test('Should properly initialize form component', () => {
    const form = createTestForm(document.body);
    form.addFormControl('Login', 'Login');

    expect(form.formControls.length).toBe(1);
    expect(form.inputs.length).toBe(1);
  });

  test('Should add two form controls to the form body.', () => {
    const form = createTestForm(document.body);

    form.addFormControl('Login', 'Login')
        .addFormControl('Password', 'Password');

    expect(form.formControls.length).toBe(2);

    const login = 'hryhorenkoser@gmail.com';

    const loginInput = form.inputs[0];
    loginInput.value = login;

    const renderedForm = document.body.firstElementChild;

    const formData = new FormData(renderedForm);

    expect(formData.get('login')).toBe(login);
  });
});
