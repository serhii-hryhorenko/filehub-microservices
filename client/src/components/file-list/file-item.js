import {Component} from '../component.js';
import {ListItemButton} from './list-item-button.js';
import {stateAware} from '../../state-management/state-aware-mixin.js';
import {targets} from '../../state-management/state.js';
import {RemoveDownloadErrorAction} from '../../state-management/actions/remove-download-error-action.js';
import {Icon} from '../icon.js';
import {ErrorMessage} from '../error-message.js';
import {StopEditingItemAction} from '../../state-management/actions/stop-editing-item-action.js';

/**
 * @typedef {object} FileModel
 * @property {string} type
 * @property {string} id
 * @property {string} parentId
 * @property {string} name
 * @property {string} mimeType
 * @property {number} size
 */

export class FileItem extends stateAware(Component) {
  static DocumentTypes = {
    PDF: {
      mimetype: 'application/pdf',
      name: 'PDF Document',
      icon: '<span class="glyphicon glyphicon-book"></span>',
    },

    TABLE: {
      mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      name: 'Excel Workbook',
      icon: '<span class="glyphicon glyphicon-list-alt"></span>',
    },

    IMAGE: {
      mimetype: 'image',
      name: 'Image',
      icon: '<span class="glyphicon glyphicon-picture"></span>',
    },

    MUSIC: {
      mimetype: 'audio',
      name: 'Audio',
      icon: '<span class="glyphicon glyphicon-music"></span>',
    },

    VIDEO: {
      mimetype: 'video',
      name: 'Video',
      icon: '<span class="glyphicon glyphicon-film"></span>',
    },
  };

  #id;
  #parentId;
  #name;
  /**
   * @property {string} mimeType
   * @property {string} name
   * @property {string} icon
   */
  #type;
  #size;

  #remove;
  #download;
  #edit;
  #editingError;

  #changeName;
  #changingName;

  #isBeingEdited = false;

  #downloadButton;

  /**
   * @param {HTMLElement} parent
   * @param stateManagementService
   * @param {string} id
   * @param {string} parentId
   * @param {string} name
   * @param {string} mimetype
   * @param {number} size
   * @param onDownload
   * @param {function(FolderModel|FileModel): void} onRemove
   * @param {function(FileModel): void} onDoubleClick
   * @param {function(FileModel): void} onChange
   */
  constructor(parent, stateManagementService, {id, parentId, name, mimetype, size}, {onDownload, onRemove, onDoubleClick, onChange}) {
    super(parent);

    this.#id = id;
    this.#parentId = parentId;
    this.#name = name;
    this.#size = size;
    this.type = mimetype;

    this.#download = () => onDownload(this.asModel);
    this.#remove = () => onRemove(this.asModel);
    this.#changeName = onChange;
    this.#edit = onDoubleClick;

    this.stateManagementService = stateManagementService;

    this.addStateHook(targets.DOWNLOADING_FILE, ({downloadingFile}) => {
      this.#downloadButton.isLoading = downloadingFile && downloadingFile.id === this.#id;
    });

    this.addStateHook(targets.DOWNLOADING_ERROR, ({downloadingError}) => this.#downloadButton.error = downloadingError);

    this.addStateHook(targets.EDITED_ITEM, ({editingItem}) => {
      this.edit = editingItem?.type === 'file' && editingItem?.id === this.#id;
    });

    this.addStateHook(targets.CHANGING_NAME, ({changingName}) => this.changingName = changingName);

    this.addStateHook(targets.EDITING_ERROR, ({editingError}) => this.editingError = editingError);

    this._init();
  }

  /**
   * @param {string} mimetype
   * @returns {FileItem.DocumentTypes}
   * @throws {Error}
   * @private
   */
  static #getDocumentType(mimetype) {
    const type = Object.values(FileItem.DocumentTypes)
        .find((type) => mimetype.startsWith(type.mimetype));

    if (!type) {
      return {
        name: 'File',
        icon: '<span class="glyphicon glyphicon-file"></span>',
        mimetype,
      };
    }

    return type;
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<tr class="content-row"> 
                <td class="expand-folder"></td>
                <td class="content-type">${this.#type.icon}</td>
                <td class="content-name">${this.addSlot('name')}</td>
                <td class="content-type-name">${this.#type.name}<td>
                <td class="content-size">${this.#formatBytes()}</td>
                <td class="content-manipulation">
                    ${this.addSlot('content-action-group')}
                </td>
            </tr>`;
  }

  /**
   * @returns {string}
   * @private
   */
  #formatBytes() {
    if (!+this.#size) {
      return '0 B';
    }

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(this.#size) / Math.log(k));

    return `${parseFloat((this.#size / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    const buttonSlot = this.getSlot('content-action-group');

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
      this.nameSlot.innerHTML = this.#name;
    }

    if (buttonSlot) {
      buttonSlot.classList.add('content-action-group');

      this.#downloadButton = ListItemButton.download(buttonSlot, () => {
        this.dispatch(new RemoveDownloadErrorAction());
        this.#download();
      });

      ListItemButton.remove(buttonSlot, this.#remove);

      this.nameSlot.addEventListener('dblclick', () => this.#edit(this.asModel));
    }
  }

  /**
   * @param {string} mimeType
   */
  set type(mimeType) {
    this.#type = FileItem.#getDocumentType(mimeType);
  }

  /**
   * @returns {FileModel}
   */
  get asModel() {
    return {
      type: 'file',
      id: this.#id,
      name: this.#name,
      parentId: this.#parentId,
    };
  }

  /**
   * @returns {HTMLElement}
   * @private
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
