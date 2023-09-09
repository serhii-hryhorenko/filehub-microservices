import {Action} from './action.js';
import {targets} from '../state.js';

export class RemoveItemAction extends Action {
  #model;

  constructor(apiService, model) {
    super(apiService);
    this.#model = model;
  }


  /**
   * @inheritDoc
   */
  execute(mutationExecutor) {
    mutationExecutor(targets.ITEM_BEING_DELETED, this.#model);

    const isFolder = this.#model.type === 'folder';
    const apiDeleteCall = isFolder ? this.apiService.deleteFolder(this.#model) : this.apiService.deleteFile(this.#model);

    return apiDeleteCall
        .then(() => mutationExecutor(targets.ITEM_IN_REMOVING_STATE, null))
        .catch((error) => mutationExecutor(targets.REMOVING_ERROR, error))
        .finally(() => mutationExecutor(targets.ITEM_BEING_DELETED, null));
  }
}
