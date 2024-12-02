// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import _ from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(123).getBalance()).toBe(123);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const user = getBankAccount(123);
    expect(() => user.withdraw(124)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const user1 = getBankAccount(123);
    const user2 = getBankAccount(122);
    expect(() => user1.transfer(124, user2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const user = getBankAccount(123);
    expect(() => user.transfer(124, user)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const user = getBankAccount(123);
    expect(user.deposit(1).getBalance()).toBe(124);
  });

  test('should withdraw money', () => {
    const user = getBankAccount(123);
    expect(user.withdraw(1).getBalance()).toBe(122);
  });

  test('should transfer money', () => {
    const user1 = getBankAccount(123);
    const user2 = getBankAccount(122);
    user1.transfer(10, user2);
    expect(user1.getBalance()).toBe(113);
    expect(user2.getBalance()).toBe(132);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const user = getBankAccount(123);
    const mockFetchBalance = jest.fn(user.fetchBalance);
    mockFetchBalance.mockResolvedValue(42);
    const result = await mockFetchBalance();
    expect(result).toBe(42);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const user = getBankAccount(123);
    jest.spyOn(_, 'random').mockReturnValue(42);
    await user.synchronizeBalance();
    expect(user.getBalance()).toBe(42);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const user = getBankAccount(123);
    jest.spyOn(_, 'random').mockReturnValue(0);
    await expect(user.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
