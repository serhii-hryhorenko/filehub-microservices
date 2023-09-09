import {Form} from '../form';
import {Page} from './page.js';

/**
 * @typedef {object} Credentials
 * @property {string} email
 * @property {string} password
 */

/**
 * The configurable component for a page with the only one child – form.
 */
export class FormPage extends Page {
  /**
   * @type {Form}
   */
  #form;

  /**
   * @type {function(HTMLElement): Form}
   */
  #formCreator;

  /**
   * @param {HTMLElement} parentElement
   * @param {string} welcomeMessage
   * @param {function(HTMLElement): Form} formCreator
   */
  constructor(parentElement, welcomeMessage, formCreator) {
    super(parentElement);

    this.title = welcomeMessage;
    this.formCreator = formCreator;
  }

  /**
   * @returns {Form}
   */
  get form() {
    return this.#form;
  }

  /**
   * @returns {HTMLElement}
   */
  get formSlot() {
    return this.getSlot('form');
  }

  /**
   * @param {function(HTMLElement): Form} creator
   */
  set formCreator(creator) {
    this.#formCreator = creator;
    this._render();
  }

  /**
   * @param {function(FormData): void} handler
   */
  set submitHandler(handler) {
    this.#form.submitHandler = handler;
  }

  /**
   * @param {function(FormData): void} listener
   */
  set onSuccessfulSubmitListener(listener) {
    this.#form.successfulSubmitListener = listener;
  }

  /**
   * @param {function(): void} handler
   */
  set onNavigateHandler(handler) {
    this.#form.redirectListener = handler;
  }

  /**
   * @inheritDoc
   */
  _markup() {
    return `<div class="wrapper">
      <header class="page-header">
        <a href="#"><img src="images/logo.png" alt="TeamDev" width="200"></a>
      </header>

      <main class="box">
        <p class="heading">${this.title ?? 'Welcome'}</p>
        <hr class="hr">
        
        ${this.addSlot('form')}
      </main>
    </div>`;
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    this.#form = this.#formCreator?.(this.getSlot('form'));
  }
}
