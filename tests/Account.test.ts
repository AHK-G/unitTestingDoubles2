import { Account, Database } from "../src/Account";

describe("Account", () => {
  const dummyDatabase: Database = {
    save() {},
  };

  it("should create an account with initialBalance 0", () => {
    const account = new Account(dummyDatabase);

    const initialBalance = account.getBalance();

    expect(initialBalance).toBe(0);
  });

  describe("Deposit", () => {
    let account: Account;

    beforeEach(() => {
      account = new Account(dummyDatabase);
    });

    it("should increase the balance from 0 to 99", () => {
      account.deposit(99);

      const balance = account.getBalance();
      expect(balance).toBe(99);
    });

    it("should call the save method to save new balance to the database", () => {
      const databaseSpy = jest.spyOn(dummyDatabase, "save");

      account.deposit(99);

      expect(databaseSpy).toHaveBeenCalledTimes(1);
      expect(databaseSpy).toHaveBeenCalledWith(99);
    });

    it("should throw an error if deposit amount is negetive number", () => {
      const depositError = () => account.deposit(-1);

      expect(depositError).toThrow("Deposit amount must be positive.");
    });

    it("should throw an error if deposit amount is 0", () => {
      const depositError = () => account.deposit(0);

      expect(depositError).toThrow("Deposit amount must be positive.");
    });
  });

  describe("Withdraw", () => {
    class FakeDatabase implements Database {
      save(balance: number): void {}

      mock = {
        save: jest.fn()
    }}

    
    let account: Account;

    beforeEach(() => {
      account = new Account(new FakeDatabase(), 100);
    });


        it("should call the save method to save new balance to the database", () => {
      const databaseSpy = jest.spyOn(dummyDatabase, "save");

      account.deposit(99);

      expect(databaseSpy).toHaveBeenCalledTimes(1);
      expect(databaseSpy).toHaveBeenCalledWith(99);
    });

    it("should decrease the balance from 100 to 0", () => {
      account.withdraw(100);

      const balance = account.getBalance();
      expect(balance).toBe(0);
    });

    it("should throw an error when withdawing negetive amoount", () => {
      const withdrawError = () => account.withdraw(-1);

      expect(withdrawError).toThrow("Withdrawal amount must be positive.");
    });
  });
});
