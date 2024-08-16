var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var BankAccount = /** @class */ (function () {
    function BankAccount() {
        this.accountDetails = {
            name: "",
            gender: "",
            dob: "",
            email: "",
            mobile: "",
            address: "",
            initialBalance: 0,
            balance: 0,
            adharNo: "",
            panNo: "",
            isAccountClosed: false,
        };
        this.ledger = [];
    }
    // Open Account
    BankAccount.prototype.openAccount = function (details) {
        if (this.accountDetails.isAccountClosed) {
            console.log("Account is closed. Cannot open a new account.");
            return;
        }
        this.accountDetails = __assign(__assign({}, details), { balance: details.initialBalance, isAccountClosed: false });
        this.ledger.push({
            date: new Date(),
            type: "Account Opened",
            amount: details.initialBalance,
            balance: details.initialBalance,
        });
        console.log("Account opened successfully.");
    };
    // Update KYC
    BankAccount.prototype.updateKYC = function (kycDetails) {
        if (this.accountDetails.isAccountClosed) {
            console.log("Account is closed. Cannot update KYC.");
            return;
        }
        this.accountDetails = __assign(__assign({}, this.accountDetails), kycDetails);
        console.log("KYC details updated successfully.");
    };
    // Deposit Money
    BankAccount.prototype.depositMoney = function (amount) {
        if (this.accountDetails.isAccountClosed) {
            console.log("Account is closed. Cannot deposit money.");
            return;
        }
        this.accountDetails.balance += amount;
        this.ledger.push({
            date: new Date(),
            type: "Deposit",
            amount: amount,
            balance: this.accountDetails.balance,
        });
        console.log("Deposited ".concat(amount, ". New Balance: ").concat(this.accountDetails.balance));
    };
    // Withdraw Money
    BankAccount.prototype.withdrawMoney = function (amount) {
        if (this.accountDetails.isAccountClosed) {
            console.log("Account is closed. Cannot withdraw money.");
            return;
        }
        if (amount > this.accountDetails.balance) {
            console.log("Insufficient balance.");
            return;
        }
        this.accountDetails.balance -= amount;
        this.ledger.push({
            date: new Date(),
            type: "Withdrawal",
            amount: amount,
            balance: this.accountDetails.balance,
        });
        console.log("Withdrew ".concat(amount, ". New Balance: ").concat(this.accountDetails.balance));
    };
    // Transfer Money
    BankAccount.prototype.transferMoney = function (toName, amount) {
        if (this.accountDetails.isAccountClosed) {
            console.log("Account is closed. Cannot transfer money.");
            return;
        }
        if (amount > this.accountDetails.balance) {
            console.log("Insufficient balance.");
            return;
        }
        this.accountDetails.balance -= amount;
        this.ledger.push({
            date: new Date(),
            type: "Transfer to ".concat(toName),
            amount: amount,
            balance: this.accountDetails.balance,
        });
        console.log("Transferred ".concat(amount, " to ").concat(toName, ". New Balance: ").concat(this.accountDetails.balance));
    };
    // Receive Money
    BankAccount.prototype.receiveMoney = function (fromName, amount) {
        if (this.accountDetails.isAccountClosed) {
            console.log("Account is closed. Cannot receive money.");
            return;
        }
        this.accountDetails.balance += amount;
        this.ledger.push({
            date: new Date(),
            type: "Received from ".concat(fromName),
            amount: amount,
            balance: this.accountDetails.balance,
        });
        console.log("Received ".concat(amount, " from ").concat(fromName, ". New Balance: ").concat(this.accountDetails.balance));
    };
    // Print Statement
    BankAccount.prototype.printStatement = function () {
        if (this.accountDetails.isAccountClosed) {
            console.log("Account is closed. Cannot print statement.");
            return;
        }
        console.log("Account Details:");
        console.log(this.accountDetails);
        console.log("\nTransaction Ledger:");
        this.ledger.forEach(function (transaction) {
            console.log("".concat(transaction.date, " - ").concat(transaction.type, " - ").concat(transaction.amount, " - Balance: ").concat(transaction.balance));
        });
    };
    // Close Account
    BankAccount.prototype.closeAccount = function () {
        this.accountDetails.isAccountClosed = true;
        console.log("Account closed successfully.");
    };
    return BankAccount;
}());
// Example usage:
var myAccount = new BankAccount();
myAccount.openAccount({
    name: "John Doe",
    gender: "male",
    dob: "1990-01-01",
    email: "john.doe@example.com",
    mobile: "1234567890",
    address: "123 Main St",
    initialBalance: 1000,
    adharNo: "1234-5678-9012",
    panNo: "ABCDE1234F",
});
myAccount.depositMoney(500);
myAccount.withdrawMoney(200);
myAccount.transferMoney("Jane Doe", 300);
myAccount.receiveMoney("Alice", 100);
myAccount.printStatement();
myAccount.closeAccount();
