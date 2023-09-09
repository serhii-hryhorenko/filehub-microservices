import {Action} from './action.js';
import {targets} from '../state.js';

export class ChangeURLQueryParametersAction extends Action {
  #parameters;

  /**
   * @param {ApiService} apiService
   * @param {object} parameters
   */
  constructor(parameters) {
    super();
    this.#parameters = parameters;
  }


  execute(mutationExecutor) {
    mutationExecutor(targets.URL_QUERY_PARAMETERS, this.#parameters);
  }
}
