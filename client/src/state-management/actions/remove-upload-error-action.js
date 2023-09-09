import {Action} from './action.js';
import {targets} from '../state.js';

export class RemoveUploadErrorAction extends Action {
  execute(mutationExecutor) {
    mutationExecutor(targets.UPLOADING_ERROR, null);
  }
}
