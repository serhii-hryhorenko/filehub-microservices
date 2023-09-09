import {Action} from './action.js';
import {targets} from '../state.js';

export class CreateFolderAction extends Action {
  #folderModel;
  #onCreate;

  constructor(apiService, {parentId, name}, onCreate) {
    super(apiService);

    this.#folderModel = {
      name,
      parentId,
      itemsAmount: 0,
      type: 'folder',
    };

    this.#onCreate = onCreate;
  }

  execute(mutationExecutor) {
    mutationExecutor(targets.NEW_FOLDER, this.#folderModel);

    return this.apiService.createFolder(this.#folderModel)
        .then(this.#onCreate)
        .catch((error) => mutationExecutor(targets.CREATING_FOLDER_ERROR, error))
        .finally(() => {
          mutationExecutor(targets.NEW_FOLDER, null);
          mutationExecutor(targets.CREATING_FOLDER, false);
        });
  }
}
