import {ApiService} from '../../rest/api-service.js';

/**
 * Abstraction over state management mutators and API service to provide application's functionality.
 * @typedef {function(string, any)} MutationExecutor
 * @interface
 */
export class Action {
  #apiService;

  /**
   * @param {ApiService} [apiService]
   */
  constructor(apiService) {
    this.#apiService = apiService;
  }

  /**
   * @returns {ApiService}
   * @protected
   */
  get apiService() {
    return this.#apiService;
  }

  /**
   * Executes an action, changing the state of the application with mutation executor callback calls.
   * @abstract
   * @param {MutationExecutor} mutationExecutor
   * @throws {Error}
   */
  execute(mutationExecutor) {
    throw new Error('Must be implemented in derived classes.');
  }
}
