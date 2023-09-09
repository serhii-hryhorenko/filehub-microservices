import {Component} from './component.js';
import {ButtonColorTheme} from './button-color-theme.js';
import {Icon} from './icon.js';

/**
 * The component to represent a button that is not bounded on width and submits form on click.
 */
export class Button extends Component {
  /**
   * @type {string}
   */
  #title;

  /**
   * @type {string}
   */
  #text;

  /**
   * @type {function(): void}
   */
  #theme;

  #onClick;

  #showLoadingIcon;

  /**
   * @param {HTMLElement} parentElement
   * @param {object} props
   * @param {string} props.text
   * @param {string} [props.title]
   * @param {function(): void} [props.onClick]
   * @param {object} props.theme
   */
  constructor(parentElement, {text = 'Button', title = text, onClick, theme = ButtonColorTheme.blue}) {
    super(parentElement);
    Object.assign(this, {theme, text, title, onClick});
    this._init();
  }

  /**
   * @param props
   * @param {string} props.text
   * @param {string} [props.title]
   * @param {function(): void} [props.onClick]
   * @param {object} props.theme
   * @returns {function(HTMLElement): Button}
   */
  static creator(props) {
    return (slot) => new Button(slot, props);
  }

  /**
   * @param {string} text
   */
  set text(text) {
    this.#text = text;
    this._render();
  }

  /**
   * @param {string} title
   */
  set title(title) {
    this.#title = title;
    this._render();
  }

  /**
   * @param {function(): void} listener
   */
  set onClick(listener) {
    this.#onClick = listener;
    this._render();
  }

  /**
   * @param {object} theme
   * @param {string} theme.background
   * @param {string} theme.text
   */
  set theme(theme) {
    this.#theme = theme;
    this._render();
  }

  /**
   * @param {boolean} flag
   */
  set showLoading(flag) {
    this.#showLoadingIcon = flag;
    this._render();
  }

  /**
   * @returns {string}
   */
  get text() {
    return this.#text;
  }

  /**
   * @returns {string}
   */
  get title() {
    return this.#title;
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<button type="submit" class="button" title="${this.#title}">
                ${this.addSlot('loading-icon')}
                ${this.#text}
            </button>`;
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    Object.assign(this.rootElement.style, this.#theme);

    if (this.#showLoadingIcon) {
      Icon.loading(this.getSlot('loading-icon'));
    }

    if (this.#onClick) {
      this.rootElement.addEventListener('click', (event) => {
        event.preventDefault();
        this.#onClick();
      });
    }
  }
}
