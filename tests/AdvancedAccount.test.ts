import {
  AdvancedAccount,
  AdvancedDatabase,
  Transaction,
} from "../src/AdvancedAccount";

describe("AdvancedAccount", () => {
  const mockDatabase: AdvancedDatabase = {
    readBalance: jest.fn(() => 0),
    readTransactions: jest.fn(),
    save: jest.fn(),
  };

  it("should create an account with initialBalance 0", () => {
    const account = new AdvancedAccount(mockDatabase);

    const initialBalance = account.getBalance();

    expect(initialBalance).toBe(0);
  });

  describe("Deposit", () => {
    let account: AdvancedAccount;

    beforeEach(() => {
      account = new AdvancedAccount(mockDatabase);
    });

    it("should increase the balance from 0 to 99 when making a deposit of 99", () => {
      account.deposit(99);

      const balance = account.getBalance();
      expect(balance).toBe(99);
    });

    it("should make a transaction when making a deposit", () => {
      account.deposit(100);

      const transactionsSpy = jest.spyOn(mockDatabase, "readTransactions");

      expect(transactionsSpy).toHaveBeenCalled();
    });

    it("should save balance and transactions to the database when making an account deposit", () => {
      account.deposit(100);

      const transactionsSpy = jest.spyOn(mockDatabase, "save");

      expect(transactionsSpy).toHaveBeenCalledWith(100, [
        { type: "deposit", amount: 100 },
      ]);
    });
  });
});
