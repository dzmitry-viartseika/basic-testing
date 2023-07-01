import { doStuffByTimeout } from './index';


describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // test('should set timeout with provided callback and timeout', () => {
  //   const callback = jest.fn();
  //   const timeout = 1000;
  //   doStuffByTimeout(callback, timeout);
  //   expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);
  // });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });
});

// describe('doStuffByInterval', () => {
//   beforeAll(() => {
//     jest.useFakeTimers();
//   });
//
//   afterAll(() => {
//     jest.useRealTimers();
//   });
//
//   test('should set interval with provided callback and timeout', () => {
//     const callback = jest.fn();
//     const interval = 1000;
//     doStuffByInterval(callback, interval);
//     expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), interval);
//   });
//
//   test('should call callback multiple times after multiple intervals', () => {
//     const callback = jest.fn();
//     const interval = 1000;
//     const numIntervals = 3;
//     doStuffByInterval(callback, interval);
//     expect(callback).not.toBeCalled();
//     jest.advanceTimersByTime(interval * numIntervals);
//     expect(callback).toHaveBeenCalledTimes(numIntervals);
//   });
// });
//
// describe('readFileAsynchronously', () => {
//   test('should call join with pathToFile', async () =>   {
//     const pathToFile = 'test.txt';
//     const joinMock = jest.spyOn(path, 'join') as jest.SpyInstance;
//     await readFileAsynchronously(pathToFile);
//     expect(joinMock).toHaveBeenCalledWith(expect.stringContaining('__dirname'), pathToFile);
//     joinMock.mockRestore();
//   });
//
//   test('should return null if file does not exist', async () => {
//     const pathToFile = 'nonexistent.txt';
//     const fileContent = await readFileAsynchronously(pathToFile);
//     expect(fileContent).toBeNull();
//   });
//
//   test('should return file content if file exists', async () => {
//     const pathToFile = 'existing.txt';
//     const expectedContent = 'File content';
//     const readFileMock = jest.spyOn(readFile, 'readFile').mockResolvedValueOnce(Buffer.from(expectedContent));
//     const fileContent = await readFileAsynchronously(pathToFile);
//     expect(fileContent).toBe(expectedContent);
//     expect(readFileMock).toHaveBeenCalledWith(expect.stringContaining('__dirname'), pathToFile);
//     readFileMock.mockRestore();
//   });
// });
