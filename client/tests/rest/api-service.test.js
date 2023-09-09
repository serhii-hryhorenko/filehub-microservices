import {describe, expect, jest, test} from '@jest/globals';
import {faker} from '@faker-js/faker';
import {ApiService} from '../../src/rest/api-service.js';
import {mockGlobalFetch, createHttpResponse, createMockedRequestService} from '../util/networking.js';

describe('Api service test', () => {
  test('Should call login method with right parameters and perform post request.', async () => {
    const response = createHttpResponse({
      data: 'successful login',
    });

    mockGlobalFetch(response);

    const requestServiceMock = createMockedRequestService(response, 'post');

    const apiService = new ApiService(requestServiceMock);

    const credentials = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const loginResponse = await apiService.login(credentials);

    expect(requestServiceMock.post).toHaveBeenCalledTimes(1);
    expect(requestServiceMock.post).toBeCalledWith('/api/authenticate', credentials);

    expect(loginResponse.status).toBe(200);
  });

  test('Should call register method with right parameters and perform post request.', async () => {
    const responseBody = {
      data: 'successful registration',
    };

    const response = createHttpResponse(responseBody);

    mockGlobalFetch(response);

    const requestServiceMock = createMockedRequestService(response, 'post');

    const apiService = new ApiService(requestServiceMock);

    const credentials = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const registrationResponse = await apiService.register(credentials);

    expect(requestServiceMock.post).toHaveBeenCalledTimes(1);
    expect(requestServiceMock.post).toBeCalledWith('/api/register', credentials);

    expect(registrationResponse.status).toBe(200);
  });
});
