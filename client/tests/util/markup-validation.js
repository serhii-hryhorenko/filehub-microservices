import {expect} from '@jest/globals';

/**
 * Returns markup of an element as a one line of HTML code.
 * @param {Element} element
 * @returns {string}
 */
export function oneLineMarkup(element) {
  return element.outerHTML.split('\n').map((str) => str.trim()).join('');
}

/**
 * Return's trimmed inner HTML that is ready for comparison.
 * @param {Element} element
 * @returns {string}
 */
export function innerHtml(element) {
  return element.innerHTML.trim();
}

/**
 * Executes expect block after timeout.
 * @param {number} numberOfErrors
 * @param {number} timeout
 */
export function expectErrorsWithTimeout(numberOfErrors, timeout = 150) {
  setTimeout(() => {
    const numberOfErrors = document.getElementsByClassName('error-message').length;
    expect(numberOfErrors).toBe(numberOfErrors);
  }, timeout);
}
