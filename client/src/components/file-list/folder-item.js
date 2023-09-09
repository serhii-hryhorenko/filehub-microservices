import {Component} from '../component.js';
import {Link} from '../link.js';
import {ListItemButton} from './list-item-button.js';
import {stateAware} from '../../state-management/state-aware-mixin.js';
import {targets} from '../../state-management/state.js';
import {ErrorMessage} from '../error-message.js';
import {Icon} from '../icon.js';
import {StopEditingItemAction} from '../../state-management/actions/stop-editing-item-action.js';

/**
 * @typedef {object} FolderModel
 * @property {string} type
 * @property {string} id
 * @property {string} parentId
 * @property {string} name
 */

export class FolderItem extends stateAware(Component) {
  #id;
  #parentId;
  #name;

  #navigate;
  #remove;
  #upload;

  #edit;
  #editingError;

  #changeName;
  #changingName;

  #uploadButton;
  #isBeingEdited = false;

  /**
   * @param {HTMLElement} parent
   * @param stateManagementService
   * @param {string} id
   * @param {string} parentId
   * @param {string} name
   * @param {function(string): void} onUpload
   * @param {function(FolderModel|FileModel): void} onRemove
   * @param {function(FolderModel): void} onDoubleClick
   * @param {function(FolderModel): void} onChange
   */
  constructor(parent, stateManagementService, {id, parentId, name}, {onUpload, onRemove, onDoubleClick, onChange}) {
    super(parent);

    this.stateManagementService = stateManagementService;

    this.#id = id;
    this.#parentId = parentId;
    this.#name = name;


    this.#upload = () => onUpload(this.asModel);
    this.#remove = () => onRemove(this.asModel);
    this.#changeName = onChange;
    this.#edit = onDoubleClick;

    this.addStateHook(targets.ARE_FILES_UPLOADING, ({uploadingFolder}) => {
      this.#uploadButton.isLoading = uploadingFolder.id && uploadingFolder.id === this.#id;
    });

    this.addStateHook(targets.UPLOADING_ERROR, ({uploadingFolder}) => {
      this.#uploadButton.error = uploadingFolder.error && uploadingFolder.id === this.#id;
    });

    this.addStateHook(targets.EDITED_ITEM, ({editingItem}) => {
      this.edit = editingItem?.type === 'folder' && editingItem?.id === this.#id;
    });

    this.addStateHook(targets.CHANGING_NAME, ({changingName}) => this.changingName = changingName);

    this.addStateHook(targets.EDITING_ERROR, ({editingError}) => this.editingError = editingError);

    this._init();
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<tr class="content-row"> 
                <td class="expand-folder">
                    <span class="glyphicon glyphicon-chevron-right">
                </td>
                <td class="content-type">
                    <span class="glyphicon glyphicon-folder-close">
                </td>
                <td class="content-name">
                    ${this.addSlot('name')}
                </td>
                <td class="content-type-name">Folder<td>
                <td class="content-size">–</td>
                <td class="content-manipulation">
                    ${this.addSlot('content-action-group')}
                </td>
            </tr>`;
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    if (this.#isBeingEdited) {
      const input = document.createElement('input');
      input.classList.add('text-input');
      input.placeholder = 'Enter directory name...';
      input.value = this.#name;
      input.onchange = () => this.#changeName({...this.asModel, name: input.value});
      input.onkeydown = (e) => {
        if (e.key === 'Escape') {
          this.dispatch(new StopEditingItemAction());
        }
      };

      this.nameSlot.append(input);

      input.focus();

      if (this.#changingName) {
        Icon.loading(this.nameSlot);
      }

      if (this.#editingError) {
        input.classList.add('error-input');
        input.after(ErrorMessage.create(this.#editingError.message));
      }
    } else {
      let clickTimer;
      new Link(this.nameSlot, {
        text: this.#name,
        onClick: (event) => {
          if (event.detail === 1) {
            clickTimer = setTimeout(() => this.#navigate?.(this.#id), 200);
          } else if (event.detail === 2) {
            clearTimeout(clickTimer);
            this.#edit(this.asModel);
          }
        },
      });
    }

    const buttonSlot = this.getSlot('content-action-group');
    buttonSlot.classList.add('content-action-group');

    this.#uploadButton = ListItemButton.upload(buttonSlot, this.#upload);
    ListItemButton.remove(buttonSlot, this.#remove);
  }

  /**
   * @param {function(string): void} handler
   */
  set navigate(handler) {
    this.#navigate = handler;
  }

  /**
   * @returns {FolderModel}
   */
  get asModel() {
    return {
      type: 'folder',
      id: this.#id,
      name: this.#name,
      parentId: this.#parentId,
    };
  }

  /**
   * @returns {HTMLElement}
   */
  get nameSlot() {
    return this.getSlot('name');
  }

  /**
   * @param {boolean} flag
   */
  set edit(flag) {
    this.#isBeingEdited = flag;
    this._render();
  }

  /**
   * @param {boolean} flag
   */
  set changingName(flag) {
    this.#changingName = flag;
    this._render();
  }


  /**
   * @param {Error} error
   */
  set editingError(error) {
    this.#editingError = error;
    this._render();
  }
}
