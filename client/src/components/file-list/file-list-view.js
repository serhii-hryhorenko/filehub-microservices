import {Component} from '../component.js';
import {stateAware} from '../../state-management/state-aware-mixin.js';
import {targets} from '../../state-management/state';
import {FolderItem} from './folder-item.js';
import {FileItem} from './file-item.js';
import {GetFolderContentAction} from '../../state-management/actions/get-folder-content-action.js';
import {Icon} from '../icon.js';
import {ErrorMessage} from '../error-message.js';

export class FileListView extends stateAware(Component) {
  #isLoading;
  #error;

  /**
   * @type {(FolderModel|FileModel)[]}
   */
  #models = [];

  #navigate;
  #remove;
  #upload;

  #download;
  #doubleClick;
  #changeName;

  /**
   * @inheritDoc
   */
  constructor(parent, stateManagementService, apiService, {onNavigateToFolder, onUpload, onRemove, onDownload, onDoubleClick, onChange}) {
    super(parent);

    this.stateManagementService = stateManagementService;

    this.#navigate = onNavigateToFolder;
    this.#upload = onUpload;
    this.#remove = onRemove;
    this.#download = onDownload;
    this.#doubleClick = onDoubleClick;
    this.#changeName = onChange;

    this._init();

    this.addStateHook(targets.IS_LOADING_FILE_LIST, ({fileList}) => this.isLoading = fileList.isLoading);
    this.addStateHook(targets.CURRENT_FOLDER_ID,
        ({currentFolder}) => this.dispatch(new GetFolderContentAction(apiService, currentFolder.id)));
    this.addStateHook(targets.CURRENT_FOLDER_CONTENT, ({currentFolderContent}) => this.models = currentFolderContent);
    this.addStateHook(targets.FILE_LIST_LOADING_ERROR, ({fileList}) => this.error = fileList.error);
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<div class="scrollable">
                <table class="content-table"></table>
            </div>`;
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    const tableWrapper = this.rootElement;
    const table = tableWrapper.firstElementChild;

    if (this.#isLoading || this.#error || !this.#models.length) {
      tableWrapper.classList.add('centered-items');
    }

    if (this.#error) {
      tableWrapper.append(ErrorMessage.withIcon('Failed to load folder content'));
      return;
    }

    if (this.#isLoading) {
      Icon.loading(tableWrapper);
      return;
    }

    if (!this.#models.length) {
      tableWrapper.classList.add('ui-text');
      tableWrapper.innerHTML = 'There are no files/directories to show.';
      return;
    }

    this.#getItemCreators().forEach((creator) => creator(table));
  }

  /**
   * @param {function(string): void} handler
   */
  set navigate(handler) {
    this.#navigate = handler;
  }

  /**
   * @returns {(function(HTMLElement): (FolderItem|FileItem))[]}
   * @private
   */
  #getItemCreators() {
    return this.#models?.map((model) => {
      if (isFolder(model)) {
        return (parent) => {
          const folder = new FolderItem(parent, this.stateManagementService, model, {
            onUpload: this.#upload,
            onRemove: this.#remove,
            onDoubleClick: this.#doubleClick,
            onChange: this.#changeName,
          });
          folder.navigate = this.#navigate;
          return folder;
        };
      }

      return (parent) => new FileItem(parent, this.stateManagementService, model, {
        onDownload: this.#download,
        onRemove: this.#remove,
        onDoubleClick: this.#doubleClick,
        onChange: this.#changeName,
      });
    });
  }

  /**
   * @param {[FileModel | FolderModel]} models
   */
  set models(models) {
    this.#models = models?.sort(compareFn).reverse();
    this._render();
  }

  /**
   * @param {boolean} flag
   */
  set isLoading(flag) {
    this.#isLoading = flag;
    this._render();
  }

  set error(error) {
    this.#error = error;
    this._render();
  }
}

const isFolder = (item) => item.type === 'folder';

const compareFn = (a, b) => {
  if ([a, b].every(isFolder)) {
    return b.name.localeCompare(a.name);
  }

  const folderItem = [a, b].find(isFolder);

  if (folderItem) {
    return folderItem === a ? 1 : -1;
  }

  return b.name.localeCompare(a.name);
};

