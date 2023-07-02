import { generateLinkedList } from './index';

const LIST = [1, 2, 3, 4, 5];
const RESULT = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: {
          value: 5,
          next: {
            value: null,
            next: null,
          },
        },
      },
    },
  },
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(LIST);
    expect(linkedList).toStrictEqual(RESULT);
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(LIST);
    expect(linkedList).toMatchSnapshot();
  });
});