/**
 * Wrapper for a Web API local storage.
 */
export class Storage {
  static #authTokenKey = 'authToken';

  /**
   * @param {string} token
   */
  static set authToken(token) {
    window.localStorage.setItem(this.#authTokenKey, token);
  }

  /**
   * @returns {string}
   */
  static get authToken() {
    return window.localStorage.getItem('authToken');
  }

  /**
   * Deletes token from the storage.
   */
  static deleteToken() {
    window.localStorage.removeItem(this.#authTokenKey);
  }
}
