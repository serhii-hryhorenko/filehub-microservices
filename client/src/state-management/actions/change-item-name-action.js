import {Action} from './action.js';
import {targets} from '../state.js';

export class ChangeItemNameAction extends Action {
  #model;
  #onChange;

  constructor(apiService, model, onChange) {
    super(apiService);
    this.#model = model;
    this.#onChange = onChange;
  }


  execute(mutationExecutor) {
    const isFolder = this.#model.type === 'folder';

    mutationExecutor(targets.CHANGING_NAME, true);

    const apiCall = isFolder ? this.apiService.editFolder(this.#model) : this.apiService.editFile(this.#model);

    return apiCall
        .then(() => {
          mutationExecutor(targets.EDITED_ITEM, null);
          this.#onChange();
        })
        .catch((error) => mutationExecutor(targets.EDITING_ERROR, error))
        .finally(() => mutationExecutor(targets.CHANGING_NAME, false));
  }
}
