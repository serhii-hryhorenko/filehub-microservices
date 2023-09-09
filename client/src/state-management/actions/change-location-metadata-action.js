import {Action} from './action.js';
import {targets} from '../state.js';

export class ChangeLocationMetadataAction extends Action {
  #routePath;
  #routeMetadata;

  /**
   * @param {object} routeMetadata
   */
  constructor(routeMetadata) {
    super();
    this.#routeMetadata = routeMetadata;
  }

  /**
   * @inheritDoc
   */
  execute(mutationExecutor) {
    mutationExecutor(targets.ROUTE_METADATA, this.#routeMetadata);
  }
}
