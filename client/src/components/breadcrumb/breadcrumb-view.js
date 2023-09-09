import {Component} from '../component.js';
import {stateAware} from '../../state-management/state-aware-mixin.js';
import {StateManagementService} from '../../state-management/state-management-service';
import {BreadcrumbElement} from './breadcrumb-element';
import {targets} from '../../state-management/state.js';
import {GetFolderAction} from '../../state-management/actions/get-folder-action.js';
import {Icon} from '../icon.js';
import {ErrorMessage} from '../error-message.js';

export class BreadcrumbView extends stateAware(Component) {
  #rootFolderId;
  #currentFolder;
  #isLoading;
  #error;
  #navigate;

  /**
   * @param {HTMLElement} parent
   * @param {StateManagementService} stateManagementService
   * @param {ApiService} apiService
   */
  constructor(parent, stateManagementService, apiService) {
    super(parent);

    this.stateManagementService = stateManagementService;

    this._init();

    this.addStateHook(targets.ROOT_FOLDER_ID, ({user}) => {
      this.#rootFolderId = user.rootFolderId;
      this.dispatch(new GetFolderAction(apiService, this.#rootFolderId));
    });

    this.addStateHook(targets.CURRENT_FOLDER_ID, ({currentFolder}) => this.currentFolder = currentFolder);
    this.addStateHook(targets.IS_LOADING_BREADCRUMB, ({breadcrumb}) => this.isLoading = breadcrumb.isLoading);
    this.addStateHook(targets.BREADCRUMB_LOADING_ERROR, ({breadcrumb}) => this.error = breadcrumb.error);
  };

  /**
   * @inheritDoc
   */
  _markup() {
    return `<ul class="breadcrumb">
                ${this.addSlot('breadcrumbs')}
            </ul>`;
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    const breadcrumbsSlot = this.getSlot('breadcrumbs');

    if (this.#error) {
      this.rootElement.firstElementChild.replaceChildren(ErrorMessage.withIcon('Failed to load folder information'));
      return;
    }

    if (this.#isLoading) {
      Icon.loading(breadcrumbsSlot);
      return;
    }

    if (!this.#currentFolder || !this.#rootFolderId) {
      return;
    }

    if (this.#currentFolder.id === this.#rootFolderId) {
      BreadcrumbElement.homeCreator(breadcrumbsSlot, this.#rootFolderId);
      return;
    }

    if (this.#currentFolder.parentId === this.#rootFolderId) {
      BreadcrumbElement.homeCreator(breadcrumbsSlot, this.#rootFolderId, this.#navigate);
      BreadcrumbElement.creator(breadcrumbsSlot, this.#currentFolder);
      return;
    }

    BreadcrumbElement.homeCreator(breadcrumbsSlot, this.#rootFolderId, this.#navigate);
    BreadcrumbElement.ellipsisCreator(breadcrumbsSlot, this.#currentFolder.parentId, this.#navigate);
    BreadcrumbElement.creator(breadcrumbsSlot, this.#currentFolder);
  }

  /**
   * @param {FolderModel} model
   */
  set currentFolder(model) {
    this.#currentFolder = model;
    this._render();
  }

  /**
   * @param {boolean} flag
   */
  set isLoading(flag) {
    this.#isLoading = flag;
    this._render();
  }

  /**
   * @param {Error} error
   */
  set error(error) {
    this.#error = error;
    this._render();
  }

  /**
   * @param {function(string): void} handler
   */
  set navigate(handler) {
    this.#navigate = handler;
  }
}
