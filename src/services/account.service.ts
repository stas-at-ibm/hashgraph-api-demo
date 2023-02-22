import {
  AccountBalance,
  AccountBalanceQuery,
  Client,
  Hbar,
  TransactionReceipt,
  TransferTransaction,
} from "@hashgraph/sdk";
import { HederaTestNetClient } from "src/infrastructure/hedera.testnet.client";
import { logger } from "src/utils/logger";

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
}
