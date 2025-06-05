export interface AdvancedDatabase {
    readBalance(): number;

    readTransactions(): Transaction[] | null;

    save(balance: number, transactions: Transaction[]): void;
}

export interface Transaction {
    type: 'deposit' | 'withdraw';
    amount: number;
}

export class AdvancedAccount {
    private balance: number;
    private transactions: Transaction[];
    private database: AdvancedDatabase;

    constructor(database: AdvancedDatabase) {
        this.database = database;
        this.balance = this.database.readBalance();
        this.transactions = this.database.readTransactions() || [];
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive.");
        }

        this.balance += amount;
        this.transactions.push({type: 'deposit', amount});
        this.saveToDatabase();
    }

    withdraw(amount: number): void {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive.");
        }

        if (this.balance < amount) {
            throw new Error("Insufficient funds.");
        }

        this.balance -= amount;
        this.transactions.push({type: 'withdraw', amount});
        this.saveToDatabase();
    }

    getBalance(): number {
        return this.balance;
    }

    getTransactionHistory(): Transaction[] {
        return this.transactions;
    }

    private saveToDatabase(): void {
        this.database.save(this.balance, this.transactions);
    }
}
