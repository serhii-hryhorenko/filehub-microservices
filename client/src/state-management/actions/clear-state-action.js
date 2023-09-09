import {Action} from './action.js';
import {State, targets} from '../state.js';

export class ClearStateAction extends Action {
  constructor() {
    super();
  }

  /**
   * @inheritDoc
   */
  execute(mutationExecutor) {
    const values = Object.values(State.initialProperties);
    Object.values(targets).forEach((target, index) => mutationExecutor(target, values[index]));
  }
}
