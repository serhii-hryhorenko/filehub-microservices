import {Component} from './component.js';
import {Button} from './button.js';

export class SearchBar extends Component {
  #searchInput;
  #search;

  /**
   * @param {HTMLElement} slot
   * @param {function(string): void} onSearch
   */
  constructor(slot, onSearch) {
    super(slot);
    this.#search = onSearch;

    this._init();
  }


  /**
   * @inheritDoc
   */
  _markup() {
    return `<div class="search-group">
                <input class="text-input" type="search" placeholder="Enter item name...">
                ${this.addSlot('search-button')}
            </div>`;
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    const searchInput = this.rootElement.firstElementChild;
    new Button(this.getSlot('search-button'), {text: 'Search', onClick: () => this.#search(searchInput.value)});
  }
}
