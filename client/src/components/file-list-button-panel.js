import {ButtonPanel} from './button-panel.js';
import {stateAware} from '../state-management/state-aware-mixin.js';
import {Button} from './button.js';
import {Icon} from './icon.js';
import {targets} from '../state-management/state.js';
import {RemoveUploadErrorAction} from '../state-management/actions/remove-upload-error-action.js';

export class FileListButtonPanel extends stateAware(ButtonPanel) {
  #isUploading;
  #uploadingError;

  constructor(slot, stateManagementService, {onUpload, onCreateFolder}) {
    super(slot, [
      Button.creator({
        text: Icon.upload.markup,
        title: 'upload',
        onClick: () => {
          this.dispatch(new RemoveUploadErrorAction());
          onUpload();
        },
      }),
      Button.creator({
        text: Icon.create.markup,
        title: 'create-folder',
        onClick: onCreateFolder,
      }),
    ]);

    this.stateManagementService = stateManagementService;

    this.addStateHook(targets.ARE_FILES_UPLOADING, ({currentFolder, uploadingFolder}) => {
      this.isUploading = uploadingFolder.id && uploadingFolder.id === currentFolder.id;
    });

    this.addStateHook(targets.UPLOADING_ERROR, ({currentFolder, uploadingFolder}) => {
      this.uploadingError = uploadingFolder.error && uploadingFolder.id && uploadingFolder.id === currentFolder.id;
    });

    this._init();
  }

  _afterRender() {
    super._afterRender();

    const [uploadButton] = this.buttons;

    if (this.#uploadingError) {
      uploadButton.text = Icon.error.markup;
      return;
    }

    if (this.#isUploading) {
      uploadButton.text = Icon.loading.markup;
    }
  }

  set isUploading(flag) {
    this.#isUploading = flag;
    this._render();
  }

  set uploadingError(flag) {
    this.#uploadingError = flag;
    this._render();
  }
}
