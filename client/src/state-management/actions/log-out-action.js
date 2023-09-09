import {Action} from './action.js';
import {Storage} from '../../rest/storage.js';

export class LogOutAction extends Action {
  /**
   * @inheritDoc
   */

  #logOutHandler;

  constructor(apiService, logOutHandler) {
    super(apiService);
    this.#logOutHandler = logOutHandler;
  }

  execute() {
    Storage.deleteToken();
    return this.apiService.logOut()
        .catch(this.#logOutHandler)
        .finally(this.#logOutHandler);
  }
}
