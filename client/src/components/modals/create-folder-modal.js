import {Modal} from './modal.js';
import {Button} from '../button.js';
import {stateAware} from '../../state-management/state-aware-mixin.js';
import {targets} from '../../state-management/state.js';
import {ErrorMessage} from '../error-message.js';
import {SetCreatingFolderErrorAction} from '../../state-management/actions/set-creating-folder-error-action.js';

export class CreateFolderModal extends stateAware(Modal) {
  constructor(slot, stateManagementService, {onCancel, onCreate}) {
    super(slot, {
      title: 'Create New Directory',
      dialogCreator: (slot) => {
        const input = document.createElement('input');
        input.classList.add('text-input', 'modal-input');
        input.placeholder = 'Enter a name of a new directory...';
        slot.append(input);
      },
      onCancel,
      resolveButtonCreator: Button.creator({
        text: 'Create',
        onClick: () => {
          const inputValue = this.dialogSlot.firstElementChild.value;

          this.dispatch(new SetCreatingFolderErrorAction(null));

          if (this.#validateInput(inputValue)) {
            onCreate(inputValue);
          } else {
            this.dispatch(new SetCreatingFolderErrorAction(new Error('Try a longer name.')));
          }
        },
      }),
    });

    this.stateManagementService = stateManagementService;

    this.addStateHook(targets.NEW_FOLDER, ({newFolder}) => this.resolveButton.showLoading = newFolder);

    this.addStateHook(targets.CREATING_FOLDER_ERROR, ({creatingFolderError}) => {
      this._render();

      if (creatingFolderError) {
        const input = this.dialogSlot.firstElementChild;
        const message = ErrorMessage.create(creatingFolderError.message);

        input.after(message);
      }
    });
  }

  /**
   * @param {string} value
   * @returns {boolean}
   * @private
   */
  #validateInput(value) {
    return value.length > 2;
  }
}
