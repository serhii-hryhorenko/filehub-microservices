import {FormPage} from './form-page';
import {AuthForm} from '../auth-form';
import {ApiService} from '../../rest/api-service';
import {TitleService} from '../../routing/title-service';

/**
 * Form page implementation for FileHub authentication page.
 */
export class AuthPage extends FormPage {
  /**
   * @param {Element} parent
   * @param {ApiService} apiService
   * @param {TitleService} titleService
   */
  constructor(parent, apiService, titleService) {
    super(parent, 'Sign in to FileHub', (parent) => new AuthForm(parent));

    this.submitHandler = async (formData) => {
      const credentials = {email: formData.get('email'), password: formData.get('password')};
      await apiService.login(credentials);
    };

    titleService.setTitle('Authorization');
  }

  /**
   * @param {HTMLElement} parent
   * @param {ApiService} apiService
   * @param {TitleService} titleService
   * @param {function(): void} onNavigateHandler
   * @param {function(): void} onSuccessfulSubmitHandler
   * @returns {function(HTMLElement): AuthPage}
   */
  static creator({apiService, titleService}, onNavigateHandler, onSuccessfulSubmitHandler) {
    return (parent) => {
      const page = new AuthPage(parent, apiService, titleService);

      page.onNavigateHandler = onNavigateHandler;
      page.onSuccessfulSubmitListener = onSuccessfulSubmitHandler;

      return page;
    };
  }
}
