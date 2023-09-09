import {Component} from './component';

/**
 * The component that provides user input in forms and give input fields context meaning via label and placeholder.
 */
export class FormControl extends Component {
  #label;
  #inputName;
  #placeholder;

  /**
   * @param {HTMLElement} parentElement
   * @param {string} label
   * @param {string} placeholder
   * @param {string} inputName
   */
  constructor(parentElement, label, placeholder, inputName) {
    super(parentElement);
    this._init();

    this.inputName = inputName.toLowerCase();
    this.label = label;
    this.placeholder = placeholder;
  }

  /**
   * Returns an input type inferred from its name, or type "text" if there isn't similar defined type.
   * @param {string} name
   * @returns {string}
   */
  #inputType(name) {
    const definedTypes = [
      'email',
      'password',
    ];

    return definedTypes.find((type) => name?.includes(type)) ?? 'text';
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<section class="form-row">
                <label for="${this.#inputName}">${this.#label}</label>
                <input id="${this.#inputName}" class="text-input" 
                    name="${this.#inputName}"
                    type="${this.#inputType(this.#inputName)}" 
                    placeholder="${this.#placeholder}">
            </section>`;
  }


  /**
   * @returns {string}
   */
  get label() {
    return this.#label;
  }

  /**
   * @returns {string}
   */
  get placeholder() {
    return this.#placeholder;
  }

  /**
   * @param {string} text
   */
  set label(text) {
    this.#label = text;
    this._render();
  }

  /**
   * @param {string} text
   */
  set placeholder(text) {
    this.#placeholder = text;
    this._render();
  }

  /**
   * @param {string} name
   */
  set inputName(name) {
    this.#inputName = name;
    this._render();
  }
}
