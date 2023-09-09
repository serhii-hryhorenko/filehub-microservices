import {ValidationError} from './validation-error';

/**
 * Container for validation errors.
 */
export class ValidationErrorResult extends Error {
  #errors;

  /**
   * @param {Array<ValidationError>} errors
   */
  constructor(errors) {
    super(`Errors occurred during validation.`);
    this.#errors = errors;
  }

  /**
   * @returns {Array<ValidationError>}
   */
  get errors() {
    return this.#errors;
  }
}
