import {Component} from './component.js';
import {FormControl} from './form-control.js';
import {Button} from './button.js';
import {Link} from './link.js';
import {ValidationService} from '../validation/validation-service.js';
import {ValidationConfig} from '../validation/validation-config.js';
import {ValidationError} from '../validation/validation-error.js';

/**
 * The component that consists of a set of form controls and the footer.
 * Provides and encapsulates validation logic that is set with a validation configuration.
 */
export class Form extends Component {
  static SUBMIT_EVENT = 'form-submit';

  #validationConfig;

  #formControlCreators = [];
  #formControls = [];

  /**
   * @type {function(HTMLElement): Button}
   */
  #buttonCreator;

  /**
   * @type {function(HTMLElement): Link}
   */
  #linkCreator;

  #inputValues = [];

  #eventTarget = new EventTarget();

  /**
   * @type {function(): void}
   */
  #redirectListener;

  #submitHandler;
  #successfulSubmitListener;

  /**
   * @param {HTMLElement} parentElement
   * @param {function(HTMLElement): Button} buttonCreator
   * @param {function(HTMLElement): Link} linkCreator
   */
  constructor(parentElement, buttonCreator, linkCreator) {
    super(parentElement);
    this.#buttonCreator = buttonCreator;
    this.#linkCreator = linkCreator;
    this._init();

    this.#eventTarget.addEventListener(Form.SUBMIT_EVENT, async (event) => {
      if (this.#validationConfig) {
        this.#inputValues = this.inputs.map((input) => input.value);
        this._render();

        const formData = event.detail.formData;

        try {
          await this.#validate(formData);

          try {
            await this.#submitHandler(formData);
            this.#successfulSubmitListener?.();
          } catch (error) {
            this.#renderServerError(error);
          }
        } catch (validationResult) {
          const errors = validationResult.errors;
          this.#renderFormControlErrors(errors);
        }
      }
    });
  }

  /**
   * Appends a new Form Control element to the form created of a given data.
   * @param {string} title
   * @param {string} placeholder
   * @param {string} inputName
   * @returns {Form}
   */
  addFormControl(title, placeholder, inputName = title.toLowerCase()) {
    this.#formControlCreators.push((parent) => new FormControl(parent, title, placeholder, inputName));
    this._render();
    return this;
  }

  /**
   * @param {FormData} formData
   * @private
   */
  async #validate(formData) {
    await new ValidationService().validate(formData, this.#validationConfig);
  }

  /**
   * @param {ValidationConfig} config
   */
  set validationConfiguration(config) {
    this.#validationConfig = config;
  }

  /**
   * Submits user input as a FormData object.
   * @abstract
   * @param {FormData} formData
   * @returns {Promise<void>}
   * @protected
   */


  /**
   * @param {function(FormData): void} handler
   */
  set submitHandler(handler) {
    this.#submitHandler = handler;
  }


  /**
   * @param {function(): void} listener
   */
  set successfulSubmitListener(listener) {
    this.#successfulSubmitListener = listener;
  }

  /**
   * @param {Function} listener
   */
  set redirectListener(listener) {
    this.#redirectListener = listener;
    this._render();
  }

  /**
   * @returns {FormControl[]}
   */
  get formControls() {
    return this.#formControls;
  }

  /**
   * @returns {HTMLInputElement[]}
   */
  get inputs() {
    return [...this.getSlot('form-controls').getElementsByTagName('input')];
  }

  /**
   * Gets the named input from the form.
   * @param {string} name
   * @returns {HTMLInputElement}
   * @protected
   */
  _getInput(name) {
    return document.getElementsByName(name).item(0);
  }

  /**
   * Creates error message element.
   * @param {string} text
   * @returns {HTMLLabelElement}
   * @protected
   */
  #createErrorMessage(text) {
    const errorElement = document.createElement('label');

    errorElement.classList.add('error-message');
    errorElement.innerHTML = text;

    return errorElement;
  }

  /**
   * @param {ValidationError[]} errors
   * @private
   */
  #renderFormControlErrors(errors) {
    errors?.forEach((error) => {
      const errorLabel = this.#createErrorMessage(error.message);
      const formControl = document.getElementsByName(error.fieldName).item(0).parentElement;
      formControl.after(errorLabel);
    });
  }


  /**
   * @param {Error} error
   * @private
   */
  #renderServerError(error) {
    const errorSlot = this.getSlot('server-error');
    errorSlot.append(this.#createErrorMessage(error.message));
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<div>
              ${this.addSlot('server-error')}
              <form class="form">
                ${this.addSlot('form-controls')}
                <section class="form-footer">
                  ${this.addSlot('button')}
                  ${this.addSlot('link')}
                </section>
              </form>
            </div>`;
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    this.#formControls = this.#formControlCreators?.map((creator) => creator(this.getSlot('form-controls')));

    this.#inputValues?.forEach((value, index) => this.inputs[index].value = value);

    const button = this.#buttonCreator?.(this.getSlot('button'));
    button.onClick = () => {
      this.#eventTarget.dispatchEvent(new CustomEvent(Form.SUBMIT_EVENT, {
        detail: {
          formData: new FormData(this.rootElement.children.item(1)),
        },
      }));
      this._render();
    };

    const link = this.#linkCreator?.(this.getSlot('link'));
    link.onClick = this.#redirectListener;
  }
}
