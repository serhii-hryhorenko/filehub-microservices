import {AuthenticationError} from './errors/authentication-error.js';
import {ForbiddenError} from './errors/forbidden-error.js';
import {DefaultServerError} from './errors/server-error.js';

/**
 * Basic response wrapper that encapsulates a logic of handling fetched data from the network.
 */
export class Response {
  #ok;

  #status;

  /**
   * @type {Promise<any>}
   */
  #body;

  /**
   * @type {Error}
   */
  #error;

  /**
   * @param {Response} response
   * @param {any} body
   */
  constructor(response, body) {
    const {status, ok} = response;

    this.#status = status;
    this.#ok = ok;

    this.#body = body;

    if (!this.#ok) {
      this.#error = Response.#getCustomError(status);
    }
  }

  /**
   * @param {Promise<Response>} fetchPromise
   * @returns {Promise<Response>}
   */
  static async json(fetchPromise) {
    return await this.create(fetchPromise, (response) => response.json());
  }

  /**
   * @param {Promise<Response>} fetchPromise
   * @returns {Promise<Response>}
   */
  static async blob(fetchPromise) {
    return await this.create(fetchPromise, (response) => response.blob());
  }

  /**
   * @param {Promise<Response>} fetchPromise
   * @param {function(Response): Promise<*>} bodyParser
   * @returns {Promise<Response>}
   */
  static async create(fetchPromise, bodyParser) {
    const response = await fetchPromise;

    if (!response.ok) {
      throw this.#getCustomError(response.status, await response.text());
    }

    return new Response(response, await bodyParser(response));
  }

  /**
   * @param {number} status
   * @param {string} message
   * @private
   */
  static #getCustomError(status, message) {
    switch (status) {
      case 401:
        return new AuthenticationError();
      case 403:
        return new ForbiddenError();
      default:
        return new DefaultServerError(message);
    }
  }

  /**
   * @returns {number}
   */
  get status() {
    return this.#status;
  }

  /**
   * @returns {boolean}
   */
  get ok() {
    return this.#ok;
  }

  /**
   * @returns {any}
   */
  get body() {
    return this.#body;
  }

  /**
   * @returns {Error}
   */
  get error() {
    return this.#error;
  }
}
