import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test.only('should generate linked list from values 1', () => {
    const elements = [1, 2, 3];

    const result = generateLinkedList(elements);

    expect(result).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: null
        }
      }
    });
  });

  test.skip('should generate linked list from values 2', () => {
    const elements = ['a', 'b', 'c'];
    const expectedLinkedList = {
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: 'c',
          next: null
        }
      }
    };

    const result = generateLinkedList(elements);

    expect(result).toStrictEqual(expectedLinkedList);
  });
});
