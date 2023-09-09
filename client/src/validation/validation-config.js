import {ValidationConfigBuilder} from './validation-config-builder.js';

/**
 * Configuration for validation service that saves entries of an input name and a validator function.
 */
export class ValidationConfig {
  #config;

  /**
   * @param {Array<Object<string, function(string): Promise<string | Error>>>} config
   */
  constructor(config) {
    this.#config = config;
  }

  /**
   * Returns a new builder instance for this class.
   * @returns {ValidationConfigBuilder}
   */
  static builder() {
    return new ValidationConfigBuilder();
  }

  /**
   * @returns {Array<Array<string, Function>>} Configuration.
   */
  get configuration() {
    return this.#config;
  }
}
