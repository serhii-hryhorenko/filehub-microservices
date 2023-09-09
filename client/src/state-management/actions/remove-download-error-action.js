import {Action} from './action.js';
import {targets} from '../state.js';

export class RemoveDownloadErrorAction extends Action {
  constructor() {
    super();
  }


  execute(mutationExecutor) {
    mutationExecutor(targets.DOWNLOADING_ERROR, null);
  }
}
