import {Action} from './action.js';
import {targets} from '../state.js';

export class DownloadAction extends Action {
  #fileModel;

  constructor(apiService, fileModel) {
    super(apiService);
    this.#fileModel = fileModel;
  }

  execute(mutationExecutor) {
    mutationExecutor(targets.DOWNLOADING_FILE, this.#fileModel);

    this.apiService.download(this.#fileModel)
        .then((response) => {
          const a = document.createElement('a');
          a.href = window.URL.createObjectURL(response.body);
          a.download = this.#fileModel.name;
          a.click();
        })
        .catch((error) => mutationExecutor(targets.DOWNLOADING_ERROR, error))
        .finally(() => mutationExecutor(targets.DOWNLOADING_FILE, null));
  }
}
