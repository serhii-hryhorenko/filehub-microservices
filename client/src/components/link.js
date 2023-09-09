import {Component} from './component.js';

/**
 * The component that is used to create text links.
 */
export class Link extends Component {
  #text;
  #url;
  #onClickListener;

  /**
   * @param {HTMLElement} parent
   * @param {object} params
   * @param {string} params.text
   * @param {string} [params.url]
   * @param {function(): void} [params.onClick]
   */
  constructor(parent, {text = 'Link', url, onClick}) {
    super(parent);
    this._init();

    Object.assign(this, {text, url, onClick});
  }

  /**
   * @param {string} text
   */
  set text(text) {
    this.#text = text;
    this._render();
  }

  /**
   * @param {string} url
   */
  set url(url) {
    this.#url = url;
    this._render();
  }

  /**
   * @param {function(): void} listener
   */
  set onClick(listener) {
    this.#onClickListener = listener;
    this._render();
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    if (this.#url) {
      this.rootElement.setAttribute('href', this.#url);
      return;
    }

    this.rootElement.addEventListener('click', (event) => {
      event.preventDefault();
      this.#onClickListener?.(event);
    });
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<a class="link">${this.#text}</a>`;
  }
}
