import {State} from './state.js';

/**
 * Clear function that changes the state of the application.
 */
export class MutatorFactory {
  /**
   * @typedef {function(State, any): State} Mutator
   * @namespace StateManagement
   * @property {string} target
   */
  /**
   * Performs a mutation of the application state.
   * @param {string} target - Application state field that will be changed.
   * @returns {function(State, any): State}
   */
  createMutatorFor(target) {
    const mutator = (applicationState, payload) => {
      return new State({...applicationState, [target]: payload});
    };

    Object.defineProperty(mutator, 'target', {
      value: target,
      configurable: false,
    });

    return mutator;
  }
}
