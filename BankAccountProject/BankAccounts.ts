class BankAccount {
  private accountDetails: {
    name: string;
    gender: string;
    dob: string;
    email: string;
    mobile: string;
    address: string;
    initialBalance: number;
    balance: number;
    adharNo: string;
    panNo: string;
    isAccountClosed: boolean;
  };
  private ledger: {
    date: Date;
    type: string;
    amount: number;
    balance: number;
  }[];

  constructor() {
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
  openAccount(details: {
    name: string;
    gender: string;
    dob: string;
    email: string;
    mobile: string;
    address: string;
    initialBalance: number;
    adharNo: string;
    panNo: string;
  }): void {
    if (this.accountDetails.isAccountClosed) {
      console.log("Account is closed. Cannot open a new account.");
      return;
    }

    this.accountDetails = {
      ...details,
      balance: details.initialBalance,
      isAccountClosed: false,
    };
    this.ledger.push({
      date: new Date(),
      type: "Account Opened",
      amount: details.initialBalance,
      balance: details.initialBalance,
    });

    console.log("Account opened successfully.");
  }

  // Update KYC
  updateKYC(kycDetails: {
    name: string;
    dob: string;
    email: string;
    mobile: string;
    adharNo: string;
    panNo: string;
  }): void {
    if (this.accountDetails.isAccountClosed) {
      console.log("Account is closed. Cannot update KYC.");
      return;
    }

    this.accountDetails = { ...this.accountDetails, ...kycDetails };
    console.log("KYC details updated successfully.");
  }

  // Deposit Money
  depositMoney(amount: number): void {
    if (this.accountDetails.isAccountClosed) {
      console.log("Account is closed. Cannot deposit money.");
      return;
    }

    this.accountDetails.balance += amount;
    this.ledger.push({
      date: new Date(),
      type: "Deposit",
      amount,
      balance: this.accountDetails.balance,
    });

    console.log(
      `Deposited ${amount}. New Balance: ${this.accountDetails.balance}`
    );
  }

  // Withdraw Money
  withdrawMoney(amount: number): void {
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
      amount,
      balance: this.accountDetails.balance,
    });

    console.log(
      `Withdrew ${amount}. New Balance: ${this.accountDetails.balance}`
    );
  }

  // Transfer Money
  transferMoney(toName: string, amount: number): void {
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
      type: `Transfer to ${toName}`,
      amount,
      balance: this.accountDetails.balance,
    });

    console.log(
      `Transferred ${amount} to ${toName}. New Balance: ${this.accountDetails.balance}`
    );
  }

  // Receive Money
  receiveMoney(fromName: string, amount: number): void {
    if (this.accountDetails.isAccountClosed) {
      console.log("Account is closed. Cannot receive money.");
      return;
    }

    this.accountDetails.balance += amount;
    this.ledger.push({
      date: new Date(),
      type: `Received from ${fromName}`,
      amount,
      balance: this.accountDetails.balance,
    });

    console.log(
      `Received ${amount} from ${fromName}. New Balance: ${this.accountDetails.balance}`
    );
  }

  // Print Statement
  printStatement(): void {
    if (this.accountDetails.isAccountClosed) {
      console.log("Account is closed. Cannot print statement.");
      return;
    }

    console.log("Account Details:");
    console.log(this.accountDetails);

    console.log("\nTransaction Ledger:");
    this.ledger.forEach((transaction) => {
      console.log(
        `${transaction.date} - ${transaction.type} - ${transaction.amount} - Balance: ${transaction.balance}`
      );
    });
  }

  // Close Account
  closeAccount(): void {
    this.accountDetails.isAccountClosed = true;
    console.log("Account closed successfully.");
  }
}

// Example usage:
const myAccount = new BankAccount();
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
