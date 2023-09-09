import {Action} from './action.js';
import {targets} from '../state.js';

export class UploadFilesAction extends Action {
  #folderId;
  #files;
  #uploadHandler;

  /**
   * @param {ApiService} apiService
   * @param {string} folderId
   * @param {[File]} files
   * @param {function(): void} uploadHandler
   */
  constructor(apiService, folderId, files, uploadHandler) {
    super(apiService);
    this.#folderId = folderId;
    this.#files = files;
    this.#uploadHandler = uploadHandler;
  }


  execute(mutationExecutor) {
    mutationExecutor(targets.UPLOADING_FOLDER_ID, this.#folderId);
    mutationExecutor(targets.ARE_FILES_UPLOADING, true);

    this.apiService.uploadFiles(this.#folderId, this.#files)
        .then(this.#uploadHandler)
        .catch((error) => mutationExecutor(targets.UPLOADING_ERROR, error))
        .finally(() => {
          mutationExecutor(targets.UPLOADING_FOLDER_ID, null);
          mutationExecutor(targets.ARE_FILES_UPLOADING, false);
        });
  }
}
