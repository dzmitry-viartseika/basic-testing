import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const data = {
      a: 2,
      b: 2,
      action: Action.Add,
    }
    const result = simpleCalculator(data);
    expect(result).toBe(4);
  });

  test('should subtract two numbers', () => {
    const data = {
      a: 8,
      b: 4,
      action: Action.Subtract,
    }
    const result = simpleCalculator(data);
    expect(result).toBe(4);
  });

  test('should multiply two numbers', () => {
    const data = {
      a: 8,
      b: 4,
      action: Action.Multiply,
    }
    const result = simpleCalculator(data);
    expect(result).toBe(32);
  });

  test('should divide two numbers', () => {
    const data = {
      a: 8,
      b: 4,
      action: Action.Divide,
    }
    const result = simpleCalculator(data);
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const data = {
      a: 3,
      b: 3,
      action: Action.Exponentiate,
    }
    const result = simpleCalculator(data);
    expect(result).toBe(27);
  });

  test('should return null for invalid action', () => {
    const data = {
      a: 3,
      b: 3,
      action: '$',
    }
    const result = simpleCalculator(data);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '2', b: 3, action: Action.Add });
    expect(result).toBeNull();
  });
});
