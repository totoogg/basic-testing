// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const add = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    const result = 3;
    expect(add).toBe(result);
  });

  test('should subtract two numbers', () => {
    const subtract = simpleCalculator({ a: 1, b: 2, action: Action.Subtract });
    const result = -1;
    expect(subtract).toBe(result);
  });

  test('should multiply two numbers', () => {
    const multiply = simpleCalculator({ a: 1, b: 2, action: Action.Multiply });
    const result = 2;
    expect(multiply).toBe(result);
  });

  test('should divide two numbers', () => {
    const divide = simpleCalculator({ a: 1, b: 2, action: Action.Divide });
    const result = 0.5;
    expect(divide).toBe(result);
  });

  test('should exponentiate two numbers', () => {
    const exponentiate = simpleCalculator({
      a: 1,
      b: 2,
      action: Action.Exponentiate,
    });
    const result = 1;
    expect(exponentiate).toBe(result);
  });

  test('should return null for invalid action', () => {
    const checkAction = simpleCalculator({
      a: 1,
      b: 2,
      action: 'null',
    });
    expect(checkAction).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const checkArgument = simpleCalculator({
      a: 's1',
      b: 2,
      action: Action.Add,
    });
    expect(checkArgument).toBeNull();
  });
});
