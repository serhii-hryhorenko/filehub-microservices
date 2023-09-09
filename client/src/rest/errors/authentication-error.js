/**
 * 401 HTTP protocol status error.
 */
export class AuthenticationError extends Error {
  /**
   * Constructs new {@link AuthenticationError} object.
   */
  constructor() {
    super('Failed to authenticate with given credentials.');
  }
}
