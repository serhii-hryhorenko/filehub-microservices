import {Action} from './action.js';
import {targets} from '../state.js';

export class CreatingFolderAction extends Action {
  #isCreating;

  constructor(flag) {
    super();
    this.#isCreating = flag;
  }

  /**
   * @inheritDoc
   */
  execute(mutationExecutor) {
    mutationExecutor(targets.CREATING_FOLDER, this.#isCreating);
  }
}
