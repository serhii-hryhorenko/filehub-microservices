import {Component} from './component.js';
import {stateAware} from '../state-management/state-aware-mixin.js';
import {targets} from '../state-management/state.js';
import {ApiService} from '../rest/api-service.js';
import {StateManagementService} from '../state-management/state-management-service.js';
import {GetUserAction} from '../state-management/actions/get-user-action.js';
import {Icon} from './icon.js';
import {Link} from './link.js';
import {ErrorMessage} from './error-message.js';

/**
 * Displays name of an authenticated user and provides access to logging out.
 */
export class UserProfile extends stateAware(Component) {
  #username;
  #isLoading = false;
  #error;

  #logOutHandler;

  /**
   * @param {HTMLElement} parent
   * @param {StateManagementService} stateManagementService
   * @param {ApiService} apiService
   * @param {function(): void} logOutHandler
   */
  constructor(parent, stateManagementService, apiService, logOutHandler) {
    super(parent);

    this.#logOutHandler = logOutHandler;

    this.stateManagementService = stateManagementService;

    this.addStateHook(targets.USERNAME, ({user}) => this.username = user.name);
    this.addStateHook(targets.IS_LOADING_USER, ({userProfile}) => this.isLoading = userProfile.isLoading);
    this.addStateHook(targets.USER_LOADING_ERROR, ({userProfile}) => this.error = userProfile.error);

    this.dispatch(new GetUserAction(apiService, logOutHandler));
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<div class="user-panel">
              ${this.addSlot('username')}
              <div class="vl"></div>
              ${this.addSlot('logout')}
            </div>`;
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    const usernameSlot = this.getSlot('username');

    if (this.#error) {
      this.rootElement.replaceChildren(ErrorMessage.withIcon('Failed to load profile information'));
      return;
    }

    usernameSlot.classList.add('ui-text');

    if (this.#isLoading) {
      Icon.loading(usernameSlot);
      return;
    }

    usernameSlot.innerHTML = `<span class="glyphicon glyphicon-user"></span>
                              <span>${this.#username}</span>`;

    const logOutSlot = this.getSlot('logout');
    new Link(logOutSlot, {text: `Log Out ${Icon.logOut.markup}`, onClick: this.#logOutHandler});
  };

  /**
   * @param {string} name
   */
  set username(name) {
    this.#username = name;
    this._render();
  }

  /**
   * @param {boolean} flag
   */
  set isLoading(flag) {
    this.#isLoading = flag;
    this._render();
  }

  /**
   * @param {Error} error
   */
  set error(error) {
    this.#error = error;
    this._render();
  }
}
