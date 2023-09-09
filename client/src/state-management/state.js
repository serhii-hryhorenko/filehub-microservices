/**
 * Export property names to be used as targets for mutators.
 */

/**
 * @typedef {string} Target
 * @namespace StateManagement
 */

/**
 * @typedef {object} targets
 * @property {Target} USERNAME
 * @property {Target} IS_LOADING_USER
 * @property {Target} USER_ERROR
 * @property {Target} IS_LOADING_BREADCRUMB
 * @property {Target} BREADCRUMB_ERROR
 */
export const targets = {
  USERNAME: 'username',
  ROOT_FOLDER_ID: 'rootFolderId',

  IS_LOADING_USER: 'isLoadingUser',
  USER_LOADING_ERROR: 'userError',

  CURRENT_FOLDER_ID: 'folderId',
  CURRENT_FOLDER_NAME: 'folderName',
  CURRENT_FOLDER_PARENT_ID: 'folderParentId',
  CURRENT_FOLDER_CONTENT: 'folderContent',

  IS_LOADING_BREADCRUMB: 'isLoadingBreadcrumb',
  BREADCRUMB_LOADING_ERROR: 'breadcrumbError',

  IS_LOADING_FILE_LIST: 'isLoadingFileList',
  FILE_LIST_LOADING_ERROR: 'fileListLoadingError',

  ROUTE_METADATA: 'routeMetadata',

  ITEM_IN_REMOVING_STATE: 'itemToBeRemoved',
  ITEM_BEING_DELETED: 'itemToBeDeleted',
  REMOVING_ERROR: 'removeError',

  UPLOADING_FOLDER_ID: 'uploadFolder',
  ARE_FILES_UPLOADING: 'isUploading',
  UPLOADING_ERROR: 'uploadError',

  CREATING_FOLDER: 'creatingNewFolder',
  NEW_FOLDER: 'createdFolder',
  CREATING_FOLDER_ERROR: 'creatingNewFolderError',

  DOWNLOADING_FILE: 'downloadFile',
  DOWNLOADING_ERROR: 'downloadError',

  URL_QUERY_PARAMETERS: 'queryParams',

  EDITED_ITEM: 'itemToBeEdited',
  CHANGING_NAME: 'changeName',
  EDITING_ERROR: 'editError',
};

/**
 * Immutable application state implementation.
 */
export class State {
  /**
   * @typedef User
   * @property {string} name
   * @property {number} rootFolderId
   */

  /**
   * @typedef StateAwareComponent
   * @property {boolean} isLoading
   * @property {Error} error
   */

  /**
   * @typedef {object} Folder
   * @property {number} id
   * @property {string} name
   * @property {number} [parentId]
   */

  /**
   * Constructs initial state object.
   * @param {State} source
   */

  static get initialProperties() {
    return {
      [targets.USERNAME]: null,
      [targets.ROOT_FOLDER_ID]: null,
      [targets.IS_LOADING_USER]: false,
      [targets.LOADING_USER_ERROR]: null,

      [targets.CURRENT_FOLDER_ID]: null,
      [targets.CURRENT_FOLDER_NAME]: null,
      [targets.CURRENT_FOLDER_PARENT_ID]: null,
      [targets.CURRENT_FOLDER_CONTENT]: null,

      [targets.IS_LOADING_BREADCRUMB]: false,
      [targets.USER_LOADING_ERROR]: null,

      [targets.IS_LOADING_FILE_LIST]: false,
      [targets.FILE_LIST_LOADING_ERROR]: null,

      [targets.ROUTE_METADATA]: null,

      [targets.ITEM_IN_REMOVING_STATE]: null,
      [targets.ITEM_BEING_DELETED]: null,
      [targets.REMOVING_ERROR]: null,

      [targets.UPLOADING_ERROR]: null,
      [targets.UPLOADING_FOLDER_ID]: null,
      [targets.ARE_FILES_UPLOADING]: false,

      [targets.CREATING_FOLDER]: false,
      [targets.NEW_FOLDER]: null,
      [targets.CREATING_FOLDER_ERROR]: null,

      [targets.DOWNLOADING_FILE]: null,
      [targets.DOWNLOADING_ERROR]: null,

      [targets.URL_QUERY_PARAMETERS]: null,

      [targets.EDITED_ITEM]: null,
      [targets.CHANGING_NAME]: false,
      [targets.EDITING_ERROR]: null,
    };
  }

  /**
   * @param {State} [source]
   */
  constructor(source = null) {
    if (!source instanceof State) {
      throw new TypeError('Can\'t create a copy of a state from a non-state object.');
    }

    Object.assign(this, source ?? State.initialProperties);
    this.#deepFreeze();
  }

  /**
   * @param {object} object
   * @private
   */
  #deepFreeze(object = this) {
    Object.freeze(object);

    Object.values(object).forEach((property) => {
      if (property && typeof property === 'object') {
        this.#deepFreeze(property);
      }
    });
  }

  /**
   * @returns {State}
   */
  get unfrozenCopy() {
    const copy = Object.getOwnPropertyNames(this)
        .reduce((copy, propertyName) => {
          copy[propertyName] = this[propertyName];
          return copy;
        }, {});
    Object.setPrototypeOf(copy, Object.getPrototypeOf(this));
    return copy;
  }

  /**
   * @returns {User}
   */
  get user() {
    const name = this[targets.USERNAME];
    const rootFolderId = this[targets.ROOT_FOLDER_ID];

    return {name, rootFolderId};
  }

  /**
   * @returns {StateAwareComponent}
   */
  get userProfile() {
    const isLoading = this[targets.IS_LOADING_USER];
    const error = this[targets.USER_LOADING_ERROR];

    return {isLoading, error};
  }

  /**
   * @returns {Folder}
   */
  get currentFolder() {
    const id = this[targets.CURRENT_FOLDER_ID];
    const name = this[targets.CURRENT_FOLDER_NAME];
    const parentId = this[targets.CURRENT_FOLDER_PARENT_ID];

    return {id, name, parentId};
  }

  /**
   * @returns {StateAwareComponent}
   */
  get breadcrumb() {
    const isLoading = this[targets.IS_LOADING_BREADCRUMB];
    const error = this[targets.BREADCRUMB_LOADING_ERROR];

    return {isLoading, error};
  }

  /**
   * @returns {StateAwareComponent}
   */
  get fileList() {
    const isLoading = this[targets.IS_LOADING_FILE_LIST];
    const error = this[targets.FILE_LIST_LOADING_ERROR];

    return {isLoading, error};
  }

  /**
   * @returns {[FileModel|FolderModel]}
   */
  get currentFolderContent() {
    return this[targets.CURRENT_FOLDER_CONTENT]?.slice();
  }

  /**
   * @returns {object}
   */
  get metadata() {
    return this[targets.ROUTE_METADATA];
  }

  get itemInRemovingState() {
    return this[targets.ITEM_IN_REMOVING_STATE];
  }

  /**
   * @returns {{item: object, error: Error}}
   */
  get removingItemError() {
    return this[targets.REMOVING_ERROR];
  }

  get removingItem() {
    return this[targets.ITEM_BEING_DELETED];
  }

  /**
   * @returns {{id: string, error: Error}}
   */
  get uploadingFolder() {
    const id = this[targets.UPLOADING_FOLDER_ID];
    const error = this[targets.UPLOADING_ERROR];

    return {id, error};
  }

  /**
   * @returns {boolean}
   */
  get isCreatingFolder() {
    return this[targets.CREATING_FOLDER];
  }

  /**
   * @returns {Error}
   */
  get creatingFolderError() {
    return this[targets.CREATING_FOLDER_ERROR];
  }

  /**
   * @returns {FolderModel}
   */
  get newFolder() {
    return this[targets.NEW_FOLDER];
  }

  /**
   * @returns {FileModel}
   */
  get downloadingFile() {
    return this[targets.DOWNLOADING_FILE];
  }

  get downloadingError() {
    return this[targets.DOWNLOADING_ERROR];
  }

  /**
   * @returns {object}
   */
  get urlQueryParameters() {
    return this[targets.URL_QUERY_PARAMETERS];
  }

  /**
   * @returns {FolderModel|FileModel}
   */
  get editingItem() {
    return this[targets.EDITED_ITEM];
  }

  /**
   * @returns {boolean}
   */
  get changingName() {
    return this[targets.CHANGING_NAME];
  }

  /**
   * @returns {Error}
   */
  get editingError() {
    return this[targets.EDITING_ERROR];
  }
}
