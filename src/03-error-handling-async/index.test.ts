import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const VALUE = 'test';

    const result = await resolveValue(VALUE);

    expect(result).toEqual(VALUE);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const ERROR_MESSAGE = 'Test error';

    expect(() => throwError(ERROR_MESSAGE)).toThrowError(ERROR_MESSAGE);
  });

  test('should throw error with default message if message is not provided', () => {
    const DEFAULT_ERROR_MESSAGE = 'Oops!';

    expect(() => throwError()).toThrowError(DEFAULT_ERROR_MESSAGE);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
