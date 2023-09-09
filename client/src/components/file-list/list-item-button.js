import {Component} from '../component.js';
import {Icon} from '../icon.js';

export class ListItemButton extends Component {
  /**
   * @typedef Action
   * @type {{REMOVE: string, UPLOAD: string, DOWNLOAD: string}}
   */
  static Action = {
    DOWNLOAD: 'download',
    UPLOAD: 'upload',
    REMOVE: 'remove',
  };

  #action;
  #iconCreator;
  #onClick;

  #isLoading = false;
  #error;

  static download(slot, handler) {
    return new ListItemButton(slot, ListItemButton.Action.DOWNLOAD, handler);
  }

  static upload(slot, handler) {
    return new ListItemButton(slot, ListItemButton.Action.UPLOAD, handler);
  }

  static remove(slot, handler) {
    return new ListItemButton(slot, ListItemButton.Action.REMOVE, handler);
  }

  /**
   * @param {HTMLElement} parent
   * @param {Action|string} action
   * @param {function(): void} [onClick]
   */
  constructor(parent, action, onClick) {
    super(parent);
    this.#action = action;
    this.#onClick = onClick;

    switch (action) {
      case ListItemButton.Action.DOWNLOAD:
        this.#iconCreator = Icon.download;
        break;

      case ListItemButton.Action.UPLOAD:
        this.#iconCreator = Icon.upload;
        break;

      case ListItemButton.Action.REMOVE:
        this.#iconCreator = Icon.remove;
        break;

      default: throw new Error('Unknown action type.');
    }

    this._init();
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<button class="glyphicon ${this.#action}">${this.addSlot('icon')}</button>`;
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    const iconSlot = this.getSlot('icon');


    if (this.#error) {
      iconSlot.classList.add('error-message');
      Icon.error(iconSlot);
    } else if (this.#isLoading) {
      Icon.loading(iconSlot);
    } else {
      this.#iconCreator(iconSlot);
    }

    this.rootElement.addEventListener('click', () => this.#onClick?.());
  }

  /**
   * @param {boolean} flag
   */
  set isLoading(flag) {
    this.#isLoading = flag;
    this._render();
  }

  /**
   * @param {boolean} flag
   */
  set error(flag) {
    this.#error = flag;
    this._render();
  }
}
