import {Action} from './action.js';
import {targets} from '../state.js';

export class SetItemInRemovingStateAction extends Action {
  #item;

  constructor(item) {
    super();
    this.#item = item;
  }

  /**
   * @inheritDoc
   */
  execute(mutationExecutor) {
    mutationExecutor(targets.ITEM_IN_REMOVING_STATE, this.#item);
  }
}
