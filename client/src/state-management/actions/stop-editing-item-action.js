import {Action} from './action.js';
import {targets} from '../state.js';

export class StopEditingItemAction extends Action {
  execute(mutationExecutor) {
    mutationExecutor(targets.CHANGING_NAME, false);
    mutationExecutor(targets.EDITING_ERROR, null);
    mutationExecutor(targets.EDITED_ITEM, null);
  }
}
