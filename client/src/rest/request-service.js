import {Response} from './response.js';

/**
 * Performs requests through to application's API.
 * Returns in-app responses representation of the responses as a result of a request action (json by default).
 */
export class RequestService {
  /**
   * Headers getter.
   * @param {string} authToken
   * @returns {{Authorization: string, "Content-Type": string}}
   */
  static authorizedJsonRequestHeaders(authToken) {
    return {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${authToken}`,
    };
  }

  /**
   * Performs post request.
   * @param {string} url
   * @param body.authToken
   * @param {object} body
   * @param {string} [authToken]
   * @param body.body
   * @returns {Response}
   */
  async post(url, {authToken, body}) {
    const options = {
      method: 'POST',
      headers: RequestService.authorizedJsonRequestHeaders(authToken),
      body: JSON.stringify(body),
    };

    return Response.json(fetch(url, options));
  }

  /**
   * Performs get request.
   * @param {string} url
   * @param {string} authToken
   * @param {fucntion(*): *} [responseParser]
   * @returns {Response}
   */
  async get(url, authToken, responseParser) {
    const options = {
      method: 'GET',
      headers: RequestService.authorizedJsonRequestHeaders(authToken),
    };

    if (responseParser) {
      return Response.create(fetch(url, options), responseParser);
    }

    return Response.json(fetch(url, options));
  }

  /**
   * Performs delete requests.
   * @param {string} url
   * @param {string} authToken
   * @param {object} body
   * @returns {Promise<Response>}
   */
  async delete(url, {authToken, body}) {
    const options = {
      method: 'DELETE',
      headers: RequestService.authorizedJsonRequestHeaders(authToken),
      body: JSON.stringify(body),
    };

    return Response.json(fetch(url, options));
  }

  /**
   * Performs put requests.
   * @param {string} url
   * @param {string} authToken
   * @param {object} body
   * @returns {Promise<Response>}
   */
  async put(url, {authToken, body}) {
    const options = {
      method: 'PUT',
      headers: RequestService.authorizedJsonRequestHeaders(authToken),
      body: JSON.stringify(body),
    };

    return Response.json(fetch(url, options));
  }

  /**
   * Posts FormData to the server.
   * @param {string} url
   * @param {string} authToken
   * @param {FormData} formData
   * @returns {Promise<Response>}
   */
  async postMultipart(url, authToken, formData) {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
      body: formData,
    };

    return Response.blob(fetch(url, options));
  }
}
