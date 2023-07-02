import fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';

const TIME = 1000;
const PATH_TO_FILE = './index.ts';
const NON_EXISTING_PATH = 'nonExistingPath';
const func = async () => await readFileAsynchronously(PATH_TO_FILE);

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(func, TIME);
    expect(setTimeout).toHaveBeenCalledWith(func, 1000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callBack = jest.fn();
    doStuffByTimeout(callBack, TIME);
    jest.advanceTimersByTime(TIME);
    expect(setTimeout).toHaveBeenCalledTimes(1);
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
    doStuffByInterval(func, TIME);
    expect(setInterval).toHaveBeenCalledWith(func, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, TIME);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(TIME * 3);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously(PATH_TO_FILE);
    expect(spyJoin).toHaveBeenCalledWith(__dirname, PATH_TO_FILE);
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously(NON_EXISTING_PATH);
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const data = 'some test data';
    const promise: Promise<string | Buffer> = new Promise((resolve) =>
        resolve(Buffer.from(data, 'utf-8')),
    );
    jest.spyOn(fsPromises, 'readFile').mockReturnValue(promise);
    const result = await readFileAsynchronously(PATH_TO_FILE);
    expect(result).toEqual(data);
  });
});