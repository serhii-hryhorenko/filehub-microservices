import {afterEach, describe, expect, test} from '@jest/globals';
import {clearDocumentBody} from '../util/setup-callbacks.js';
import {oneLineMarkup} from '../util/markup-validation.js';
import {Component} from '../../src/components/component.js';

/**
 * Stub class for testing Component API and life cycle.
 */
class TestComponent extends Component {
  #notifications = [];

  /**
   * @param {Element} parent
   */
  constructor(parent) {
    super(parent);
    this._init();
  }

  /**
   * Adds a new notification to the list.
   * @param {string} message
   */
  notifyDeveloper(message) {
    this.#notifications.push(message);
  }

  /**
   * Returns all #notifications concatenated by a comma separator.
   * @returns {string}
   */
  getNotifications() {
    return this.#notifications?.join(', ');
  }

  /**
   * @inheritDoc
   */
  _init() {
    this.notifyDeveloper('init');
    super._init();
  }

  /**
   * @inheritDoc
   */
  _afterRender() {
    this.notifyDeveloper('after render');

    const notificationSection = this.getSlot('notifications');
    notificationSection.innerHTML = this.getNotifications();
  }

  /**
   * @inheritDoc
   */
  _markup() {
    this.notifyDeveloper('markup');
    return `<section class="testComponent">${this.addSlot('notifications')}</section>>`;
  }
}

describe('Abstract component test', () => {
  afterEach(clearDocumentBody);

  test('Abstract component life cycle test', () => {
    const component = new TestComponent(document.body);
    expect(component.getNotifications()).toBe('init, markup, after render');

    component.notifyDeveloper('test attempt');
    expect(component.getNotifications()).toBe('init, markup, after render, test attempt');
  });

  test('Should render valid markup.', () => {
    const component = new TestComponent(document.body);

    const renderedComponent = document.body.firstElementChild;

    expect(oneLineMarkup(renderedComponent)).toBe('<section class="testComponent"><slot data-td="notifications">init, markup, after render</slot></section>');
  });
});


