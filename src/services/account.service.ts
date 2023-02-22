import {
  AccountBalance,
  AccountBalanceQuery,
  AccountCreateTransaction,
  Client,
  Hbar,
  PrivateKey,
  TransactionReceipt,
  TransferTransaction,
} from "@hashgraph/sdk";
import { HederaTestNetClient } from "src/infrastructure/hedera.testnet.client";
import { logger } from "src/utils/logger";

export interface Account {
  name: string;
  accountId: string;
  privateKey: string;
  publicKey: string;
}

export class AccountService {
  #client: Client;

  constructor(hedera: HederaTestNetClient) {
    this.#client = hedera.client;
  }

  async getAccountBalanceById(accId: string): Promise<AccountBalance> {
    const query = new AccountBalanceQuery().setAccountId(accId);

    // Sign with the client operator account private key and submit to a Hedera network
    return await query.execute(this.#client);
  }

  async transferHbar(
    sourceAccId: string,
    targetAccId: string,
    amount: Hbar,
  ): Promise<TransactionReceipt> {
    if (this.#client.operatorAccountId?.toString() !== sourceAccId)
      throw new Error(
        `initiating transaction account id ${this.#client.operatorAccountId?.toString()} must be equal source account id ${sourceAccId}`,
      );

    const transaction = new TransferTransaction()
      .addHbarTransfer(sourceAccId, amount.negated())
      .addHbarTransfer(targetAccId, amount);

    logger.info(`transfering hbar from ${sourceAccId} to ${targetAccId}`);

    // Sign with the client operator key and submit the transaction to a Hedera network
    const txId = await transaction.execute(this.#client);

    // Request the receipt of the transaction
    const receipt = await txId.getReceipt(this.#client);

    // Get the transaction consensus status
    const transactionStatus = receipt.status;

    logger.info(`transaction consensus status is ${transactionStatus}`);

    return receipt;
  }

  async createAccount(
    name: string = "account1",
    initialBalance: number = 1000,
  ): Promise<Account> {
    // Create new keys
    const newAccountPrivateKey = PrivateKey.generateED25519();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    // Create a new account with 1,000 tinybar starting balance
    const newAccount = await new AccountCreateTransaction()
      .setKey(newAccountPublicKey)
      .setInitialBalance(Hbar.fromTinybars(initialBalance))
      .execute(this.#client);

    // Get the new account ID
    const receipt = await newAccount.getReceipt(this.#client);
    const newAccountId = receipt.accountId!;

    logger.info(`the new account ID is: ${newAccountId}`);

    // Verify the account balance
    const accountBalance = await new AccountBalanceQuery()
      .setAccountId(newAccountId)
      .execute(this.#client);

    logger.info(`the new balance is: ${accountBalance.hbars.toTinybars()} tinybar`);

    return {
      name,
      accountId: newAccountId.toString(),
      privateKey: newAccountPrivateKey.toStringRaw(),
      publicKey: newAccountPublicKey.toStringRaw(),
    };
  }
}
