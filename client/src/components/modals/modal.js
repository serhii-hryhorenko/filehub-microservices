import {Component} from '../component.js';
import {Button} from '../button.js';
import {ButtonColorTheme} from '../button-color-theme.js';

/**
 * Abstract modal window class that defines the common structure of modals
 * and {@link destroy} behaviour.
 */
export class Modal extends Component {
  #title;

  #dialogCreator;

  #cancelButtonCreator;

  #resolveButtonCreator;
  #resolveButton;

  #onCancel;

  /**
   * @inheritDoc
   */
  constructor(parent, {title = 'Modal window', dialogCreator, onCancel, resolveButtonCreator}) {
    super(parent);
    this._init();

    this.#onCancel = onCancel ?? (() => this.destroy());

    this.#cancelButtonCreator = (parent) => new Button(parent, {
      text: 'Cancel',
      onClick: this.#onCancel,
      theme: ButtonColorTheme.white,
    });

    this.title = title;
    this.dialogCreator = dialogCreator;
    this.resolveButtonCreator = resolveButtonCreator;
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<div class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <p>${this.#title}</p>
                        ${this.addSlot('close-button')}
                    </div>
            
                    <form class="modal-form">
                        ${this.addSlot('message')}
                        ${this.addSlot('buttons')}
                    </form>
                </div>
            </div>`;
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    const buttonSlot = this.getSlot('buttons');
    buttonSlot.classList.add('modal-buttons');

    const closeButton = this.getSlot('close-button');
    closeButton.innerHTML = '<span class="glyphicon glyphicon-remove ui-text"></span>';
    closeButton.onclick = this.#onCancel;

    this.#dialogCreator?.(this.getSlot('message'));
    this.#cancelButtonCreator?.(buttonSlot);
    this.#resolveButton = this.#resolveButtonCreator?.(buttonSlot);
  }

  /**
   * @inheritDoc
   */
  destroy() {
    this.rootElement.remove();
  }

  /**
   * @param {string} text
   */
  set title(text) {
    this.#title = text;
    this._render();
  }

  /**
   * @param {function(HTMLElement): Component|void} creator
   */
  set dialogCreator(creator) {
    this.#dialogCreator = creator;
    this._render();
  }

  /**
   * @param {function(HTMLElement): Button} creator
   */
  set resolveButtonCreator(creator) {
    this.#resolveButtonCreator = creator;
    this._render();
  }

  /**
   * @returns {Button}
   */
  get resolveButton() {
    return this.#resolveButton;
  }

  /**
   * @returns {HTMLElement}
   */
  get dialogSlot() {
    return this.getSlot('message');
  }
}
