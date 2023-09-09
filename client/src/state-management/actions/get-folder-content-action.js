import {Action} from './action.js';
import {targets} from '../state.js';

export class GetFolderContentAction extends Action {
  #currentFolderId;
  #searchParameter;
  #items;

  /**
   * @param {ApiService} apiService
   * @param {string} currentFolderId
   * @param {string} [searchParameter]
   */
  constructor(apiService, currentFolderId, searchParameter) {
    super(apiService);
    this.#currentFolderId = currentFolderId;
    this.#searchParameter = searchParameter;
  }

  /**
   * @inheritDoc
   */
  execute(mutationExecutor) {
    return this.apiService.loadFolderContent(this.#currentFolderId, this.#searchParameter)
        .then(async (response) => {
          mutationExecutor(targets.IS_LOADING_FILE_LIST, true);
          const models = response.body;
          mutationExecutor(targets.CURRENT_FOLDER_CONTENT, models);
        })
        .catch((error) => mutationExecutor(targets.FILE_LIST_LOADING_ERROR, error))
        .finally(() => mutationExecutor(targets.IS_LOADING_FILE_LIST, false));
  }
}
