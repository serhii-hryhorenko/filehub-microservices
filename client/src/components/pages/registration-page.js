import {FormPage} from './form-page.js';
import {RegistrationForm} from '../registration-form.js';
import {ApiService} from '../../rest/api-service.js';
import {TitleService} from '../../routing/title-service.js';

/**
 * Form page implementation for FileHub registration page.
 */
export class RegistrationPage extends FormPage {
  /**
   * @param {Element} parent
   * @param {ApiService} apiService
   * @param {TitleService} titleService
   */
  constructor(parent, apiService, titleService) {
    super(parent, 'Sign up to FileHub', (parent) => new RegistrationForm(parent, apiService));

    this.submitHandler = async (formData) => {
      const credentials = {
        email: formData.get('email'),
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        password: formData.get('password'),
      };

      await apiService.register(credentials);
    };

    titleService.setTitle('Registration');
  }

  /**
   * @param {HTMLElement} parent
   * @param {ApiService} apiService
   * @param {TitleService} titleService
   * @param {function(): void} onNavigateHandler
   * @param {function(): void} onSuccessfulSubmitHandler
   * @returns {function(HTMLElement): RegistrationPage}
   */
  static creator({apiService, titleService}, onNavigateHandler, onSuccessfulSubmitHandler) {
    return (parent) => {
      const page = new RegistrationPage(parent, apiService, titleService);

      page.onNavigateHandler = onNavigateHandler;
      page.onSuccessfulSubmitListener = onSuccessfulSubmitHandler;

      return page;
    };
  }
}
