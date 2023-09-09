import {describe, expect, test} from '@jest/globals';
import {RequestService} from '../../src/rest/request-service.js';
import {createHttpResponse, mockGlobalFetch} from '../util/networking.js';

describe('Request service test', () => {
  test('Should call global fetch function one time for a post request.', async () => {
    const requestBody = {data: 'test'};

    const response = createHttpResponse(requestBody);

    mockGlobalFetch(response);

    const requestService = new RequestService();

    const postResponse = await requestService.post('test/', requestBody);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('test/',
        {
          'method': 'POST',
          'headers': {'Content-Type': 'application/json; charset=utf-8'},
          'body': JSON.stringify(requestBody),
        },
    );

    expect(await postResponse.body).toEqual(requestBody);
  });

  test('Should call global fetch function one time for a get request.', async () => {
    const responseBody = {error: 'Error messages'};

    const response = createHttpResponse(responseBody);

    mockGlobalFetch(response);

    const requestService = new RequestService();

    const token = 'testUserToken';
    const getResponse = await requestService.get('test', token);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenLastCalledWith('test',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${token}`,
          },
        },
    );

    expect(getResponse.status).toBe(200);
    expect(await getResponse.body).toEqual(responseBody);
  });
});
