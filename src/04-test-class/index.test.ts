import {
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
  getBankAccount
} from './index';

const INITIAL_BALANCE = 100;
const WITH_DRAW_AMOUNT = 200;
const TRANSFER_AMOUNT = 300;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = new BankAccount(INITIAL_BALANCE);
    expect(account.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = new BankAccount(INITIAL_BALANCE);

    expect(() => account.withdraw(WITH_DRAW_AMOUNT)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = new BankAccount(INITIAL_BALANCE);
    const account2 = new BankAccount(50);
    expect(() => account1.transfer(TRANSFER_AMOUNT, account2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = new BankAccount(INITIAL_BALANCE);
    const transferAmount = 50;
    expect(() => account.transfer(transferAmount, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = new BankAccount(INITIAL_BALANCE);
    const depositAmount = 50;
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = new BankAccount(INITIAL_BALANCE);
    const withdrawAmount = 50;
    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const account1 = new BankAccount(INITIAL_BALANCE);
    const account2 = new BankAccount(50);
    const transferAmount = 50;
    account1.transfer(transferAmount, account2);
    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = new BankAccount(100);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
    expect(balance).not.toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 200;
    const account = getBankAccount(INITIAL_BALANCE);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toEqual(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(100);
    account.fetchBalance = async () => null;
    await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);  });
});
