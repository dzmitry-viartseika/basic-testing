import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

const money = 50;

describe('BankAccount', () => {
  test('should create account with initial balance', async () => {
    const account = getBankAccount(money);
    expect(account).toBeTruthy();
    expect(account.getBalance()).toBe(money);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(money);
    const withdrawMore = account.withdraw.bind(account, money * 2);
    expect(withdrawMore).toThrow(InsufficientFundsError);
    expect(withdrawMore).toThrow(
        `Insufficient funds: cannot withdraw more than ${money}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(money);
    const account2 = getBankAccount(money);
    const trancferBinded = account1.transfer.bind(
        account1,
        money * 2,
        account2,
    );
    expect(trancferBinded).toThrow(Error);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(money);
    const trancferBinded = account.transfer.bind(account, money / 2, account);
    expect(trancferBinded).toThrow(TransferFailedError);
    expect(trancferBinded).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const initialBalance = money;
    const deposit = money * 2;
    const account = getBankAccount(initialBalance);
    account.deposit(deposit);
    expect(account.getBalance()).toBe(initialBalance + deposit);
  });

  test('should withdraw money', () => {
    const initialBalance = money * 2;
    const withdraw = money;
    const account = getBankAccount(initialBalance);
    account.withdraw(withdraw);
    expect(account.getBalance()).toBe(initialBalance - withdraw);
  });

  test('should transfer money', () => {
    const initialBalance = money * 4;
    const transfer = money;
    const account1 = getBankAccount(initialBalance);
    const account2 = getBankAccount(initialBalance);
    account1.transfer(transfer, account2);
    expect(account1.getBalance()).toBe(initialBalance - transfer);
    expect(account2.getBalance()).toBe(initialBalance + transfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(money);
    const balance = await account.fetchBalance();
    const requestFailed: boolean = balance === null;
    if (requestFailed) {
      expect(balance).toBeNull();
    } else {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = money;
    const newBalance = money * 5;
    const account = getBankAccount(initialBalance);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(newBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(money);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
        SynchronizationFailedError,
    );
  });
});