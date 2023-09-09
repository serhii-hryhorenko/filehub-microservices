import {Action} from './action.js';
import {targets} from '../state.js';

export class SetCreatingFolderErrorAction extends Action {
  #error;

  constructor(error) {
    super();
    this.#error = error;
  }

  execute(mutationExecutor) {
    mutationExecutor(targets.CREATING_FOLDER_ERROR, this.#error);
  }
}
