import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const expectedUrl = 'https://jsonplaceholder.typicode.com/posts/1';

    const axiosClientMock: Partial<AxiosInstance> = {
      get: jest.fn().mockResolvedValueOnce({ data: {} }),
    };

    axios.create = jest.fn().mockReturnValue(axiosClientMock as AxiosInstance);

    await throttledGetDataFromApi(expectedUrl);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });

    expect(axiosClientMock.get).toHaveBeenCalledWith(expectedUrl);
  });

  test('should perform request to correct provided url', async () => {
    const mockResponseData = { id: 1, title: 'Test Post' };
    const axiosGetSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockResponseData });

    const mockAxiosInstance: AxiosInstance = { get: axiosGetSpy } as any;
    jest.spyOn(axios, 'create').mockReturnValueOnce(mockAxiosInstance);

    const relativePath = '/posts/1';
    await throttledGetDataFromApi(relativePath);

    expect(axiosGetSpy).toHaveBeenCalledTimes(1);
    expect(axiosGetSpy).toHaveBeenCalledWith(`${relativePath}`);
  });

  test('should return response data', async () => {
    const mockResponseData = { id: 1, title: 'Test Post' };
    const axiosClient: AxiosInstance = {
      get: jest.fn().mockResolvedValueOnce({ data: mockResponseData }),
    } as any;

    jest.spyOn(axios, 'create').mockReturnValueOnce(axiosClient);

    const relativePath = '/posts/1';
    const response = await throttledGetDataFromApi(relativePath);

    expect(response).toEqual(mockResponseData);
  });
});