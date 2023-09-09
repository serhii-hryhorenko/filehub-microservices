import {ValidationConfig} from './validation-config';

/**
 * Builder for a validation config.
 */
export class ValidationConfigBuilder {
  #formData = [];

  /**
   * Adds a field name and its validator function.
   * @param {string} fieldName
   * @param {function(string): Promise<string | Error>} validator
   * @returns {ValidationConfigBuilder}
   * @throws {TypeError}
   */
  addField(fieldName, validator) {
    if (typeof fieldName !== 'string') {
      throw new TypeError('Field name is expected to be a string.');
    }

    this.#formData.push({fieldName, validator});
    return this;
  }

  /**
   * Builds a new ValidationConfig instance.
   * @returns {ValidationConfig} Configuration.
   */
  build() {
    return new ValidationConfig(this.#formData);
  }
}
