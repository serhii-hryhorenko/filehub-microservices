/**
 * 5** HTTP protocol status error.
 */
export class DefaultServerError extends Error {
  /**
   * Constructs new {@link DefaultServerError} object.
   * @param {string} message
   */
  constructor(message) {
    super(message);
  }
}
