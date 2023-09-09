import {Action} from './action.js';
import {targets} from '../state.js';

/**
 * Loads data about user to the state management service.
 */
export class GetUserAction extends Action {
  #onError;

  constructor(apiService, onError) {
    super(apiService);
    this.#onError = onError;
  }

  /**
   * @inheritDoc
   */
  execute(mutationExecutor) {
    mutationExecutor(targets.IS_LOADING_USER, true);
    mutationExecutor(targets.IS_LOADING_BREADCRUMB, true);
    mutationExecutor(targets.IS_LOADING_FILE_LIST, true);

    return this.apiService.loadUser()
        .then(async (response) => {
          const {name, rootFolderId} = response.body;
          mutationExecutor(targets.USERNAME, name);
          mutationExecutor(targets.ROOT_FOLDER_ID, rootFolderId);
        })
        .catch((error) => {
          mutationExecutor(targets.USER_LOADING_ERROR, error);
          mutationExecutor(targets.BREADCRUMB_LOADING_ERROR, error);
          mutationExecutor(targets.FILE_LIST_LOADING_ERROR, error);
          this.#onError();
        })
        .finally(() => mutationExecutor(targets.IS_LOADING_USER, false));
  }
}
