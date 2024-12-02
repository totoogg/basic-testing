// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 10);
    expect(setTimeout).toHaveBeenCalledWith(callback, 10);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const time = 10;
    doStuffByTimeout(callback, time);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 10);
    expect(setInterval).toHaveBeenCalledWith(callback, 10);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const time = 10;
    doStuffByInterval(callback, time);
    jest.advanceTimersByTime(time * 10);
    expect(callback).toBeCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathSpy = jest.spyOn(path, 'join');
    const pathToFile = '/src/index.txt';
    await readFileAsynchronously(pathToFile);
    expect(pathSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const pathToFile = '/src/index.txt';
    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue('true');
    const pathToFile = '/src/index.txt';
    await expect(readFileAsynchronously(pathToFile)).resolves.toBe('true');
  });
});
