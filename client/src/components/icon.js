export class Icon {
  /**
   * @typedef {function(HTMLElement): void} IconCreator
   * @property {string} markup
   */

  /**
   * @param {string} markup
   * @returns {IconCreator}
   * @private
   */
  static #creatorSupplier(markup) {
    const fn = (slot) => {
      slot.innerHTML = markup + ' ' + slot.innerHTML;
      return slot;
    };

    fn.markup = markup;
    return fn;
  }

  /**
   * @returns {IconCreator}
   */
  static get loading() {
    return this.#creatorSupplier('<span class="glyphicon glyphicon-repeat"></span>');
  }

  /**
   * @returns {IconCreator}
   */
  static get create() {
    return this.#creatorSupplier(`<span class="glyphicon glyphicon-plus"></span>`);
  }

  /**
   * @returns {IconCreator}
   */
  static get upload() {
    return this.#creatorSupplier(`<span class="glyphicon glyphicon-upload"></span>`);
  }

  /**
   * @returns {IconCreator}
   */
  static get remove() {
    return this.#creatorSupplier(`<span class="glyphicon glyphicon-remove-circle"></span>`);
  }

  static get download() {
    return this.#creatorSupplier(`<span class="glyphicon glyphicon-download"></span>`);
  }

  static get logOut() {
    return this.#creatorSupplier('<span class="glyphicon glyphicon-log-out"></span>');
  }

  static get error() {
    return this.#creatorSupplier('<span class="glyphicon glyphicon-exclamation-sign"></span>');
  }
}
