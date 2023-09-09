import {jest} from '@jest/globals';
import {Response} from '../../src/rest/response.js';

/**
 * @param {Response} response
 */
export function mockGlobalFetch(response) {
  global.fetch = jest.fn(() => Promise.resolve(response));
}

/**
 * Creates custom {@link Response}-like object.
 * @param {object} responseBody
 * @param {number} status
 * @returns {Response}
 */
export function createHttpResponse(responseBody, status = 200) {
  return {
    status: 200,
    ok: status === 200,
    json: () => Promise.resolve(responseBody),
  };
}

/**
 * Creates a mock implementation of a {@link RequestService}.
 * @param {Response} response
 * @param {...string} methods
 * @returns {RequestService}
 */
export function createMockedRequestService(response, ...methods) {
  const mockedRequestMethod = jest.fn(() => Promise.resolve(response));

  return methods.reduce((requestService, method) => ({...requestService, [method]: mockedRequestMethod}), {});
}
