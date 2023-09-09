import {StateManagementService} from './state-management-service.js';
import {State} from './state.js';
import {Action} from './actions/action.js';

/**
 * Creates mixin object with state aware behaviour.
 * @mixin StateAwareMixin
 * @param {Class} Class
 * @returns {{new(): StateAwareMixin, prototype: StateAwareMixin}}
 */
export function stateAware(Class) {
  return class StateAwareMixin extends Class {
    #stateManagementService;
    #stateListenerRemovers = [];
    #error;

    /**
     * Subscribes to the state of the app, registers a change handler and invokes base component's render method
     * on every target value change.
     * @param {string} target
     * @param {function(State): Promise<unknown> | void} hook
     */
    addStateHook(target, hook) {
      const removeStateListenerFn = this.#stateManagementService.addStateListener(target, hook);
      this.#stateListenerRemovers.push(removeStateListenerFn);
    }

    /**
     * Dispatches an action.
     * @param {Action} action
     */
    dispatch(action) {
      return this.#stateManagementService.dispatch(action);
    }

    /**
     * @inheritDoc
     */
    destroy() {
      super.destroy?.();
      this.#stateListenerRemovers?.forEach((stateListenerRemover) => stateListenerRemover());
    }

    /**
     * @returns {StateManagementService}
     */
    get stateManagementService() {
      return this.#stateManagementService;
    }

    /**
     * @param {StateManagementService} service
     */
    set stateManagementService(service) {
      this.#stateManagementService = service;
    }
  };
}
