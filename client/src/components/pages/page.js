import {Component} from '../component.js';
import {Modal} from '../modals/modal.js';

/**
 * Basic abstract component for aggregating other components and managing life-cycles.
 * @abstract
 */
export class Page extends Component {
  #components = [];
  #modal;

  /**
   * Saves the component to own container.
   * @param {Component} component
   * @returns {Component}
   */
  mountComponent(component) {
    this.#components.push(component);
    return component;
  }

  /**
   * @inheritDoc
   */
  destroy() {
    this.#components?.forEach((component) => component.destroy());
  }

  /**
   * @param {Modal} window
   */
  set modal(window) {
    this.#modal = window;
  }

  /**
   * @returns {Modal}
   */
  get modal() {
    return this.#modal;
  }
}
