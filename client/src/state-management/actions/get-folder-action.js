import {Action} from './action.js';
import {targets} from '../state.js';

export class GetFolderAction extends Action {
  #folderId;

  /**
   * @inheritDoc
   */
  constructor(apiService, folderId) {
    super(apiService);
    this.#folderId = folderId;
  }

  /**
   * @inheritDoc
   */
  execute(mutationExecutor) {
    return this.apiService.loadFolder(this.#folderId)
        .then(async (response) => {
          mutationExecutor(targets.IS_LOADING_BREADCRUMB, true);
          mutationExecutor(targets.IS_LOADING_FILE_LIST, true);

          const {name, parentId, id} = response.body;

          mutationExecutor(targets.CURRENT_FOLDER_NAME, name);
          mutationExecutor(targets.CURRENT_FOLDER_PARENT_ID, parentId);
          mutationExecutor(targets.CURRENT_FOLDER_ID, id);
        })
        .catch((error) => {
          mutationExecutor(targets.BREADCRUMB_LOADING_ERROR, error);
          mutationExecutor(targets.FILE_LIST_LOADING_ERROR, error);
        })
        .finally(() => mutationExecutor(targets.IS_LOADING_BREADCRUMB, false));
  }
}
