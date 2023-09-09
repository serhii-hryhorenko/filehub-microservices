/**
 * Error of validation for a certain input element.
 */
export class ValidationError {
  #fieldName;
  #message;

  /**
   * @param {string} fieldName
   * @param {string} message
   */
  constructor(fieldName, message) {
    this.#fieldName = fieldName;
    this.#message = message;
  }

  /**
   * @returns {string}
   */
  get fieldName() {
    return this.#fieldName;
  }

  /**
   * @returns {string}
   */
  get message() {
    return this.#message;
  }
}
