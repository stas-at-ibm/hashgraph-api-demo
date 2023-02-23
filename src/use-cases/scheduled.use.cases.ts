import {
  Hbar,
  PrivateKey,
  ScheduleCreateTransaction,
  TransferTransaction,
} from "@hashgraph/sdk";
import { HederaTestNetClient } from "src/infrastructure/hedera.testnet.client";
import { accounts } from "src/utils/accounts";
import { logger } from "src/utils/logger";

export class ScheduledUseCases {
  static async scheduleTx() {
    const client = new HederaTestNetClient().client;

    //Create a transaction to schedule
    const transaction = new TransferTransaction()
      .addHbarTransfer(accounts.account1.accountId, new Hbar(-2))
      .addHbarTransfer(accounts.account2.accountId, new Hbar(2));

    //Schedule a transaction
    const scheduledTx = await new ScheduleCreateTransaction()
      .setScheduledTransaction(transaction)
      .setScheduleMemo("scheduled TX of 2 Hbar from acc1 to acc2")
      .setAdminKey(PrivateKey.fromString(accounts.main.privateKey))
      .execute(client);

    //Get the receipt of the transaction
    const receipt = await scheduledTx.getReceipt(client);

    //Get the schedule ID
    logger.info(`the schedule ID is ${receipt.scheduleId}`);

    //Get the scheduled transaction ID
    logger.info(`the scheduled transaction ID is ${receipt.scheduledTransactionId}`);

    process.exit();
  }

  static async deleteTx() {}

  static async scheduleTxInfo() {}

  static async submitScheduleTx() {}
}
