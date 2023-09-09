import {Form} from './form.js';
import {Link} from './link.js';
import {Button} from './button.js';
import {ValidationConfig} from '../validation/validation-config.js';
import {emailValidator, passwordValidator} from '../validation/promises.js';

/**
 * The component that configures basic form to represent the authentication form.
 */
export class AuthForm extends Form {
  /**
   * @inheritDoc
   */
  constructor(parentElement) {
    super(parentElement,
        (parent) => new Button(parent, {text: 'Sign In'}),
        (parent) => new Link(parent, {
          text: 'Don\'t have an account yet?',
        }),
    );

    this.addFormControl('Email', 'Email')
        .addFormControl('Password', 'Password');

    this.validationConfiguration = ValidationConfig.builder()
        .addField(`email`, emailValidator)
        .addField(`password`, passwordValidator)
        .build();
  }
}
