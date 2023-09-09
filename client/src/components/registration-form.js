import {Form} from './form.js';
import {Button} from './button.js';
import {Link} from './link.js';
import {confirmPasswordValidator, emailValidator, passwordValidator} from '../validation/promises.js';
import {ValidationConfig} from '../validation/validation-config.js';

/**
 * The component that configures basic form to represent the registration form.
 */
export class RegistrationForm extends Form {
  /**
   * @inheritDoc
   */
  constructor(parentElement, submitHandler) {
    super(parentElement,
        (parent) => new Button(parent, {text: 'Sign Up'}),
        (parent) => new Link(parent, {
          text: 'Already have an account?',
        }),
    );

    this.submitHandler = submitHandler;

    this.addFormControl('Email', 'Email')
        .addFormControl('First Name', 'First Name', 'first-name')
        .addFormControl('Last Name', 'Last Name', 'last-name')
        .addFormControl('Password', 'Password')
        .addFormControl('Confirm Password', 'Confirm Password', 'confirm-password');

    this.validationConfiguration = ValidationConfig.builder()
        .addField(`email`, emailValidator)
        .addField(`password`, passwordValidator)
        .addField('confirm-password', confirmPasswordValidator(() => this._getInput('password')?.value))
        .build();
  }
}
