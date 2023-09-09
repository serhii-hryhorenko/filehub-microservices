import {State, targets} from './state.js';
import {MutatorFactory} from './mutator-factory.js';
import {Action} from './actions/action.js';

export const STATE_CHANGED_EVENT = `state-changed`;

/**
 * Service that manage the state of application.
 * @namespace StateManagement
 */
export class StateManagementService {
  /**
   * @type {State}
   */
  #state;

  /**
   * @type {Mutator[]}
   */
  #mutators;

  #eventTarget;

  /**
   * Constructs pre-configured state management service instance with an initial state.
   */
  constructor() {
    this.#eventTarget = new EventTarget();

    this.#state = new State();

    const mutatorFactory = new MutatorFactory();
    this.#mutators = Object.values(targets).map((target) => mutatorFactory.createMutatorFor(target));
  }

  /**
   * @param {string} target - State property name.
   * @param {any} payload
   * @throws {Error}
   * @private
   */
  #mutate(target, payload) {
    const mutator = this.#mutators.find((mutator) => mutator.target === target);

    if (!mutator) {
      throw new Error(`There is no registered mutator for ${target}.`);
    }

    const newState = mutator(this.#state, payload);

    const proxyState = new Proxy(this.#state.unfrozenCopy, {
      set: (state, key, value) => {
        const isNewState = Reflect.get(state, key) !== value;
        const changedSuccessfully = Reflect.set(state, key, value);

        if (isNewState && changedSuccessfully) {
          const eventType = `${STATE_CHANGED_EVENT}-${target}`;

          const stateChangeEvent = new CustomEvent(eventType, {
            detail: state,
          });

          this.#eventTarget.dispatchEvent(stateChangeEvent);
        }

        return changedSuccessfully;
      },
    });

    Object.assign(proxyState, newState);

    this.#state = newState;
  }

  /**
   * @returns {function(string, *): void}
   */
  get #mutationExecutor() {
    return (target, payload) => this.#mutate(target, payload);
  }

  /**
   * Executes an action.
   * @param {Action} action
   */
  dispatch(action) {
    return action.execute(this.#mutationExecutor);
  }

  /**
   * @returns {State}
   */
  get state() {
    return new State(this.#state);
  }

  /**
   * Adds a listener for state change events.
   * Wraps initial listener in an async function to provide step-by-step event processing.
   * @param {string} target
   * @param {function(State): void} listener
   * @returns {function(): void} Closure to remove a state listener.
   */
  addStateListener(target, listener) {
    const STATE_CHANGE_EVENT_NAME = `${STATE_CHANGED_EVENT}-${target}`;

    const asyncListener = async (state) => await listener(state.detail);
    this.#eventTarget.addEventListener(STATE_CHANGE_EVENT_NAME, asyncListener);

    return () => this.#eventTarget.removeEventListener(STATE_CHANGE_EVENT_NAME, asyncListener);
  }
}
