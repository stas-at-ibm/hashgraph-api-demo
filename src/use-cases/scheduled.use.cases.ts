import {
  Hbar,
  ScheduleCreateTransaction,
  ScheduleDeleteTransaction,
  ScheduleInfoQuery,
  ScheduleSignTransaction,
  Timestamp,
  TransferTransaction,
} from "@hashgraph/sdk";
import { client } from "src/utils/client";
import { env } from "src/utils/env";
import { log } from "src/utils/log";

export class ScheduledUseCases {
  static async scheduleTx() {
    const tx = new TransferTransaction()
      .addHbarTransfer(env.acc1.id, new Hbar(-2))
      .addHbarTransfer(env.acc2.id, new Hbar(2));

    const txResponse = await new ScheduleCreateTransaction()
      .setScheduledTransaction(tx)
      .setScheduleMemo("scheduled TX of 2 Hbar from acc1 to acc2")
      .setAdminKey(env.mainAcc.privateKey)
      .execute(client);

    const receipt = await txResponse.getReceipt(client);

    log.info(`transaction status is ${receipt.status}`);

    log.info(`the schedule ID is ${receipt.scheduleId}`);
  }

  static async deleteTx() {
    const signTx = await new ScheduleDeleteTransaction()
      .setScheduleId(env.scheduleId)
      .freezeWith(client)
      .sign(env.mainAcc.privateKey);

    const txResponse = await signTx.execute(client);

    const receipt = await txResponse.getReceipt(client);

    log.info(`transaction status is ${receipt.status}`);
  }

  static async scheduleTxInfo() {
    const query = new ScheduleInfoQuery().setScheduleId(env.scheduleId);

    const info = await query.execute(client);

    const expirationTime = new Timestamp(
      info.expirationTime!.seconds,
      info.expirationTime!.nanos,
    ).toDate();

    log.info(`the scheduledId you queried for is: ${info.scheduleId.toString()}`);
    log.info(`the memo for it is: ${info.scheduleMemo}`);
    log.info(`it got created by: ${info.creatorAccountId!.toString()}`);
    log.info(`it got payed by: ${info.payerAccountId!.toString()}`);
    log.info(`the expiration time of the scheduled tx is: ${expirationTime}`);

    info.executed
      ? log.info(`the transaction has not been executed yet`)
      : log.info(
          `the time of execution of the scheduled tx is: ${new Timestamp(
            info.executed!.seconds,
            info.executed!.nanos,
          ).toDate()}`,
        );
  }

  static async submitScheduleTx() {
    const signTx = await new ScheduleSignTransaction()
      .setScheduleId(env.scheduleId)
      .freezeWith(client)
      .sign(env.acc1.privateKey);

    const txResponse = await signTx.execute(client);

    try {
      const receipt = await txResponse.getReceipt(client);
      log.info(`the schedule transaction consensus status ${receipt.status.toString()}`);
    } catch (error) {
      log.error(error, `scheduled tx with id ${env.scheduleId} can not be executed`);
    }
  }
}
