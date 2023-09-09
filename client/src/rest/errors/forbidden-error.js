/**
 * 403 HTTP protocol status error.
 */
export class ForbiddenError extends Error {
  /**
   * Constructs new {@link ForbiddenError} object.
   */
  constructor() {
    super('Access denied.');
  }
}
