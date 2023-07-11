import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    // continue cases for other actions
];

describe('simpleCalculator', () => {
  testCases.forEach((testCase) => {
    const { a, b, action, expected } = testCase;

    test(`should return ${expected} for a=${a}, b=${b}, action=${action}`, () => {
      const rawInput = { a, b, action };
      const result = simpleCalculator(rawInput);
      expect(result).toBe(expected);
    });
  });
});
