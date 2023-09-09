import {Component} from './component.js';
import {Button} from './button.js';

export class ButtonPanel extends Component {
  #buttonCreators;
  #buttons;

  /**
   * @param {HTMLElement} slot
   * @param {[function(HTMLElement): Button]} buttonCreators
   */
  constructor(slot, buttonCreators) {
    super(slot);
    this.#buttonCreators = buttonCreators;
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<div class="button-group">${this.addSlot('buttons')}</div>`;
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    this.#buttons = this.#buttonCreators?.map((creator) => creator(this.getSlot('buttons')));
  }

  /**
   * @returns {[Button]}
   */
  get buttons() {
    return this.#buttons;
  }
}
