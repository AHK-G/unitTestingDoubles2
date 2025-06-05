export interface Database {
    save(balance: number): void;
}

export class Account {
    private balance: number;
    private readonly database: Database;

    constructor(database: Database, initialBalance: number = 0) {
        this.balance = initialBalance;
        this.database = database;
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive.");
        }
        this.balance += amount;
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
        this.saveToDatabase();
    }

    getBalance(): number {
        return this.balance;
    }

    private saveToDatabase(): void {
        if (this.database) {
            this.database.save(this.balance);
        }
    }
}
