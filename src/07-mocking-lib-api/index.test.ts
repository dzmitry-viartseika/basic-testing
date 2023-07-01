import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe.skip('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateMock = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/');
    expect(axiosCreateMock).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.useFakeTimers();
    const axiosGetMock = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: 'test' });
    const resultPromise = throttledGetDataFromApi('/posts');
    jest.runAllTimers();
    const result = await resultPromise;
    expect(axiosGetMock).toHaveBeenCalledWith('/posts');
    expect(result).toBe('test');
  });

  test('should return response data', async () => {
    jest.useFakeTimers();
    const resultPromise = throttledGetDataFromApi('/posts');
    jest.runAllTimers();
    const result = await resultPromise;
    expect(result).toBe('test');
  });
});