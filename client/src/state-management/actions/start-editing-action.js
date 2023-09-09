import {Action} from './action.js';
import {targets} from '../state.js';

export class StartEditingAction extends Action {
  model;

  constructor(model) {
    super();
    this.model = model;
  }


  execute(mutationExecutor) {
    mutationExecutor(targets.EDITED_ITEM, this.model);
  }
}
