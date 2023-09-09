/**
 * Abstract component entity that has life cycle, renders itself and encapsulates logic if needed.
 */
export class Component {
  #parentElement;
  #rootElement;

  /**
   * @param {HTMLElement} parentElement
   */
  constructor(parentElement) {
    this.#parentElement = parentElement;
  }

  /**
   * @returns {HTMLElement}
   * @protected
   */
  get rootElement() {
    return this.#rootElement;
  }

  /**
   * Initializes the component on the stage of object construction.
   * @protected
   */
  _init() {
    this._render();
  }

  /**
   * Creates an HTML markup of the component.
   * @abstract
   * @returns {string}
   * @protected
   */
  _markup() {
    throw new Error('Not implemented in the derived class.');
  }

  /**
   * Creates a root element in a virtual environment.
   * @returns {HTMLElement}
   */
  #createHtmlElement() {
    const tempElement = document.createElement('template');
    tempElement.innerHTML = this._markup();

    return tempElement.content.firstElementChild;
  }

  /**
   * Renders the component relative to its parent element.
   * @protected
   */
  _render() {
    const firstRendered = !this.#rootElement;
    const element = this.#createHtmlElement();

    if (firstRendered) {
      this.#parentElement.appendChild(element);
    } else {
      this.#rootElement.replaceWith(element);
    }

    this.#rootElement = element;
    this._afterRender();
  }

  /**
   * Callback function that is called each time after the component renders itself.
   * @returns {void}
   * @protected
   */
  _afterRender() {

  }

  /**
   * Completes component's life-cycle.
   */
  destroy() {

  }

  /**
   * Creates a markup for a new tagged section.
   * @param {string} name
   * @returns {string}
   * @protected
   */
  addSlot(name) {
    return `<slot data-td="${name}"></slot>`;
  }

  /**
   * Returns a tagged section from the component root element.
   * @param {string} name
   * @returns {HTMLElement}
   * @protected
   */
  getSlot(name) {
    return this.#rootElement.querySelector(`[data-td="${name}"]`);
  }
}

