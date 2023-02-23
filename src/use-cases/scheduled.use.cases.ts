import {
  AccountId,
  Hbar,
  PrivateKey,
  ScheduleCreateTransaction,
  ScheduleDeleteTransaction,
  ScheduleId,
  ScheduleInfoQuery,
  ScheduleSignTransaction,
  Timestamp,
  TransferTransaction,
} from "@hashgraph/sdk";
import { HederaTestNetClient } from "src/infrastructure/hedera.testnet.client";
import { env } from "src/utils/env";
import { logger } from "src/utils/logger";

export class ScheduledUseCases {
  static async scheduleTx() {
    const client = new HederaTestNetClient().client;

    //Create a transaction to schedule
    const transaction = new TransferTransaction()
      .addHbarTransfer(env.acc1.id, new Hbar(-2))
      .addHbarTransfer(env.acc2.id, new Hbar(2));

    //Schedule a transaction
    const scheduledTx = await new ScheduleCreateTransaction()
      .setScheduledTransaction(transaction)
      .setScheduleMemo("scheduled TX of 2 Hbar from acc1 to acc2")
      .setAdminKey(PrivateKey.fromString(env.mainAcc.privateKey))
      .execute(client);

    //Get the receipt of the transaction
    const receipt = await scheduledTx.getReceipt(client);

    //Get the schedule ID
    logger.info(`the schedule ID is ${receipt.scheduleId}`);

    //Get the scheduled transaction ID
    logger.info(`the scheduled transaction ID is ${receipt.scheduledTransactionId}`);

    process.exit();
  }

  static async deleteTx() {
    const client = new HederaTestNetClient().client;

    //Create the transaction and sign with the admin key
    const tx = await new ScheduleDeleteTransaction()
      .setScheduleId(env.scheduleId)
      .freezeWith(client)
      .sign(PrivateKey.fromString(env.mainAcc.privateKey));

    //Sign with the operator key and submit to a Hedera network
    const txResponse = await tx.execute(client);

    //Get the transaction receipt
    const receipt = await txResponse.getReceipt(client);

    logger.info(`the delete transaction consensus status ${receipt.status.toString()}`);

    process.exit();
  }

  static async scheduleTxInfo() {
    const client = new HederaTestNetClient().client;

    //Create the query
    const query = new ScheduleInfoQuery().setScheduleId(env.scheduleId);

    //Sign with the client operator private key and submit the query request to a node in a Hedera network
    const info = await query.execute(client);
    logger.info(
      "the scheduledId you queried for is: " + new ScheduleId(info.scheduleId).toString(),
    );
    logger.info("the memo for it is: " + info.scheduleMemo);
    logger.info("it got created by: " + new AccountId(info.creatorAccountId!).toString());
    logger.info("it got payed by: " + new AccountId(info.payerAccountId!).toString());
    logger.info(
      "the expiration time of the scheduled tx is: " +
        new Timestamp(info.expirationTime!.seconds, info.expirationTime!.nanos).toDate(),
    );

    if (info.executed === null) {
      logger.info("the transaction has not been executed yet");
    } else {
      logger.info(
        "the time of execution of the scheduled tx is: " +
          new Timestamp(info.executed!.seconds, info.executed!.nanos).toDate(),
      );
    }

    process.exit();
  }

  static async submitScheduleTx() {
    const client = new HederaTestNetClient().client;

    const tx = await new ScheduleSignTransaction()
      .setScheduleId(env.scheduleId)
      .freezeWith(client)
      .sign(PrivateKey.fromString(env.acc1.privateKey));

    //Sign with the client operator key to pay for the transaction and submit to a Hedera network
    const txResponse = await tx.execute(client);

    try {
      //Get the receipt of the transaction
      const receipt = await txResponse.getReceipt(client);

      logger.info(
        `the schedule transaction consensus status ${receipt.status.toString()}`,
      );
    } catch (error) {
      logger.error(error, `scheduled tx with id ${env.scheduleId} can not be executed`);
    }

    process.exit();
  }
}
