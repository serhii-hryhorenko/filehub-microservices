import {ValidationConfig} from './validation-config';
import {ValidationError} from './validation-error';
import {ValidationErrorResult} from './validation-error-result';

/**
 * Provides a form validation by a given configuration.
 */
export class ValidationService {
  /**
   * Validates the fields for a given configuration.
   * @param {FormData} formData
   * @param {ValidationConfig} config
   */
  async validate(formData, config) {
    const errors = [];

    for (const configEntry of config.configuration) {
      const {fieldName, validator} = {...configEntry};

      const fieldValue = formData.get(fieldName);

      try {
        await validator(fieldValue);
      } catch (e) {
        errors.push(new ValidationError(fieldName, e.message));
      }
    }

    if (errors.length > 0) {
      throw new ValidationErrorResult(errors);
    }
  }
}
