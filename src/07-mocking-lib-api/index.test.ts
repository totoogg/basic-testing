// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

beforeEach(() => {
  (axios.create as jest.MockedFunction<typeof axios.create>).mockImplementation(
    () => axios,
  );

  (axios.get as jest.MockedFunction<typeof axios.get>).mockImplementation(
    () => {
      return Promise.resolve({
        data: [{ id: 1, name: 'books' }],
      });
    },
  );
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    const baseURL = 'https://jsonplaceholder.typicode.com';
    await throttledGetDataFromApi('/posts');
    expect(axiosSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/posts');
    expect(axios.get).toHaveBeenCalledTimes(0);
  });

  test('should return response data', async () => {
    await expect(throttledGetDataFromApi('/posts')).resolves.toEqual([
      { id: 1, name: 'books' },
    ]);
  });
});
