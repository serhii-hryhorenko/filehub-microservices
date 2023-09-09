import {Modal} from './modal.js';
import {Button} from '../button.js';
import {ButtonColorTheme} from '../button-color-theme.js';
import {stateAware} from '../../state-management/state-aware-mixin.js';
import {targets} from '../../state-management/state.js';
import {ErrorMessage} from '../error-message.js';

export class RemoveItemModal extends stateAware(Modal) {
  /**
   * @param {HTMLElement} parent
   * @param stateManagementService
   * @param {FileModel|FolderModel} itemModel
   * @param {function(): void} onCancel
   * @param {function(FileModel|FolderModel): void} onDelete
   */
  constructor(parent, stateManagementService, itemModel, {onCancel, onDelete}) {
    super(parent, {
      title: 'Remove Item',
      dialogCreator: (slot) => {
        slot.innerHTML = `Are you sure you want to delete "${itemModel.name}" item?`;
      },
      onCancel: onCancel,
      resolveButtonCreator: (parent) => new Button(parent, {
        text: 'Remove',
        onClick: () => onDelete(itemModel),
        theme: ButtonColorTheme.danger,
      }),
    });

    this.stateManagementService = stateManagementService;

    this.addStateHook(targets.ITEM_BEING_DELETED, ({removingItem}) => this.resolveButton.showLoading = removingItem);

    this.addStateHook(targets.REMOVING_ERROR, ({removingItemError}) => {
      this._render();

      if (removingItemError) {
        this.dialogSlot.after(ErrorMessage.create('Failed to remove item'));
      }
    });
  }
}
