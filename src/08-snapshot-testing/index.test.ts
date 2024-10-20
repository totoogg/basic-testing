// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const result = {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 1,
        },
        value: 1,
      },
      value: 1,
    };
    expect(generateLinkedList([1, 1, 1])).toStrictEqual(result);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([1, 1, 1])).toMatchSnapshot();
  });
});
