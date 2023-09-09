import {Page} from './page.js';
import {TitleService} from '../../routing/title-service.js';
import {StateManagementService} from '../../state-management/state-management-service.js';
import {targets} from '../../state-management/state.js';
import {stateAware} from '../../state-management/state-aware-mixin.js';
import {ApiService} from '../../rest/api-service.js';
import {UserProfile} from '../user-profile.js';
import {BreadcrumbView} from '../breadcrumb/breadcrumb-view.js';
import {FileListView} from '../file-list/file-list-view.js';
import {ClearStateAction} from '../../state-management/actions/clear-state-action.js';
import {SetItemInRemovingStateAction} from '../../state-management/actions/set-item-in-removing-state-action.js';
import {GetFolderAction} from '../../state-management/actions/get-folder-action.js';
import {GetFolderContentAction} from '../../state-management/actions/get-folder-content-action.js';
import {RemoveItemAction} from '../../state-management/actions/remove-item-action.js';
import {RemoveItemModal} from '../modals/remove-item-modal.js';
import {FileListButtonPanel} from '../file-list-button-panel.js';
import {UploadFilesAction} from '../../state-management/actions/upload-files-action.js';
import {CreateFolderModal} from '../modals/create-folder-modal.js';
import {CreatingFolderAction} from '../../state-management/actions/creating-folder-action.js';
import {CreateFolderAction} from '../../state-management/actions/create-folder-action.js';
import {DownloadAction} from '../../state-management/actions/download-action.js';
import {LogOutAction} from '../../state-management/actions/log-out-action.js';
import {SearchBar} from '../search-bar.js';
import {StartEditingAction} from '../../state-management/actions/start-editing-action.js';
import {ChangeItemNameAction} from '../../state-management/actions/change-item-name-action.js';

/**
 * Main page component.
 */
export class MainPage extends stateAware(Page) {
  #apiService;
  #navigateToFolderHandler;
  #logOutHandler;
  #searchHandler;

  #currentFolderId;

  /**
   * @param {HTMLElement} parent
   * @param {TitleService} titleService
   * @param {StateManagementService} stateManagementService
   * @param {ApiService} apiService
   * @param {function(string): void} navigateToFolderHandler
   * @param {function(): void} logOutHandler
   * @param {function(string): void} searchHandler
   */
  constructor(parent, titleService, stateManagementService, apiService, navigateToFolderHandler, logOutHandler, searchHandler) {
    super(parent);
    this.stateManagementService = stateManagementService;
    this.#apiService = apiService;
    this.#navigateToFolderHandler = navigateToFolderHandler;
    this.#logOutHandler = logOutHandler;
    this.#searchHandler = searchHandler;
    titleService.setTitle('Main');

    this._init();

    this.addStateHook(targets.ROUTE_METADATA, ({metadata, user}) => {
      if (metadata?.folderId) {
        return this.dispatch(new GetFolderAction(apiService, metadata.folderId));
      } else {
        return this.dispatch(new GetFolderAction(apiService, user.rootFolderId));
      }
    });

    this.addStateHook(targets.URL_QUERY_PARAMETERS, ({urlQueryParameters}) => {
      return this.dispatch(new GetFolderContentAction(apiService, this.#currentFolderId, urlQueryParameters));
    });

    this.addStateHook(targets.CURRENT_FOLDER_CONTENT, ({currentFolder}) => this.#currentFolderId = currentFolder.id);

    this.addStateHook(targets.ITEM_IN_REMOVING_STATE, ({itemInRemovingState}) => {
      if (itemInRemovingState) {
        const modalSlot = this.getSlot('modal');

        this.modal = new RemoveItemModal(modalSlot, stateManagementService, itemInRemovingState, {
          onCancel: () => this.dispatch(new SetItemInRemovingStateAction(null)),
          onDelete: async (item) => {
            await this.dispatch(new RemoveItemAction(apiService, item));
            await this.dispatch(new GetFolderContentAction(apiService, this.#currentFolderId));
          },
        });
      } else {
        this.modal.destroy();
      }
    });

    this.addStateHook(targets.CREATING_FOLDER, ({isCreatingFolder}) => {
      if (isCreatingFolder) {
        const modalSlot = this.getSlot('modal');

        this.modal = new CreateFolderModal(modalSlot, stateManagementService, {
          onCancel: () => this.dispatch(new CreatingFolderAction(false)),
          onCreate: (folderName) => this.dispatch(
              new CreateFolderAction(apiService,
                  {parentId: this.#currentFolderId, name: folderName},
                  () => this.dispatch(new GetFolderContentAction(apiService, this.#currentFolderId))),
          ),
        });
      } else {
        this.modal.destroy();
      }
    });
  }

  /**
   * Returns a creator for a Main Page.
   * @param {HTMLElement} parent
   * @param {TitleService} titleService
   * @param {StateManagementService} stateManagementService
   * @param {ApiService} apiService
   * @param {function(string): void} navigateToFolderHandler
   * @param {function(): void} logOutHandler
   * @param searchHandler
   * @param onDoubleClick
   * @param onChange
   * @param searchHandler
   * @param {function(FolderModel|FileModel): void}onDoubleClick
   * @param {function(FolderModel|FileModel): void} onChange
   * @returns {function(HTMLElement): MainPage}
   */
  static creator({titleService, stateManagementService, apiService}, {navigateToFolderHandler, logOutHandler, searchHandler}) {
    return (parent) => new MainPage(parent, titleService, stateManagementService, apiService,
        navigateToFolderHandler, logOutHandler, searchHandler );
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<div>
              ${this.addSlot('modal')}  
              <div class="big-wrapper">
                <header class="page-header-with-user-menu">
                    <a><img src="./images/logo.png" alt="TeamDev" width="200"></a>
                    ${this.addSlot('user-profile')}
                </header>
                
                <main class="box big-box">
                    ${this.addSlot('breadcrumb')}
                    <hr class="hr">
                    
                    ${this.addSlot('table-control-panel')}
                    
                    ${this.addSlot('file-list')}
                </main>
              </div>
            </div>`;
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    this.mountComponent(new FileListView(this.getSlot('file-list'),
        this.stateManagementService,
        this.#apiService,
        {
          onNavigateToFolder: this.#navigateToFolderHandler,
          onUpload: (model) => this.#getFilesToUpload(model.id),
          onRemove: (model) => this.dispatch(new SetItemInRemovingStateAction(model)),
          onDownload: (model) => this.dispatch(new DownloadAction(this.#apiService, model)),
          onDoubleClick: (model) => this.dispatch(new StartEditingAction(model)),
          onChange: (model) => this.dispatch(
              new ChangeItemNameAction(
                  this.#apiService,
                  model,
                  () => this.dispatch(new GetFolderContentAction(this.#apiService, this.#currentFolderId)),
              ),
          ),
        }));

    this.mountComponent(new BreadcrumbView(this.getSlot('breadcrumb'),
        this.stateManagementService,
        this.#apiService)).navigate = this.#navigateToFolderHandler;

    this.mountComponent(new UserProfile(this.getSlot('user-profile'),
        this.stateManagementService,
        this.#apiService,
        () => this.dispatch(new LogOutAction(this.#apiService, this.#logOutHandler))));

    const tableControlTableSlot = this.getSlot('table-control-panel');
    tableControlTableSlot.classList.add('table-control-panel');

    this.mountComponent(new SearchBar(tableControlTableSlot, this.#searchHandler));

    this.mountComponent(new FileListButtonPanel(tableControlTableSlot,
        this.stateManagementService,
        {
          onUpload: () => this.#getFilesToUpload(this.#currentFolderId),
          onCreateFolder: () => this.dispatch(new CreatingFolderAction(true)),
        },
    ));
  }

  /**
   * @inheritDoc
   */
  destroy() {
    super.destroy();
    this.dispatch(new ClearStateAction());
  }

  /**
   * @param {string} folderId
   * @private
   */
  #getFilesToUpload(folderId) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.click();

    fileInput.onchange = () => {
      this.dispatch(new UploadFilesAction(this.#apiService,
          folderId,
          [...fileInput.files],
          () => {
            if (folderId === this.#currentFolderId) {
              this.dispatch(new GetFolderContentAction(this.#apiService, folderId));
            }
          }));
    };
  }
}
