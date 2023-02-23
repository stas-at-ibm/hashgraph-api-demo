import {
  AccountBalanceQuery,
  AccountCreateTransaction,
  AccountId,
  Hbar,
  KeyList,
  TransferTransaction,
} from "@hashgraph/sdk";
import { client } from "src/utils/client";
import { env } from "src/utils/env";
import { log } from "src/utils/log";

export class MultiSigUseCases {
  static async createMultiKeyWallet() {
    const keyList = new KeyList(
      [env.acc1.publicKey, env.acc2.publicKey, env.acc3.publicKey],
      2,
    );

    const txResponse = await new AccountCreateTransaction()
      .setKey(keyList)
      .setInitialBalance(new Hbar(20))
      .execute(client);

    const receipt = await txResponse.getReceipt(client);

    log.info(`transaction consensus status is ${receipt.status}`);

    const newAccountId = receipt.accountId!;

    log.info(`the new account ID is: ${newAccountId}`);

    const balance = await new AccountBalanceQuery()
      .setAccountId(newAccountId)
      .execute(client);

    log.info(`the new balance is: ${balance.hbars} Hbar`);
  }

  static async failingTx() {
    const tx = new TransferTransaction()
      .addHbarTransfer(env.multiSigAccId, new Hbar(-10))
      .addHbarTransfer(env.acc4.id, new Hbar(10))
      .setNodeAccountIds([new AccountId(3)])
      .freezeWith(client);

    const signTx = await tx.sign(env.acc1.privateKey);

    const txResponse = await signTx.execute(client);

    const receipt = await txResponse.getReceipt(client);

    log.info(`transaction consensus status is ${receipt.status}`);
  }

  static async successTx() {
    const tx = new TransferTransaction()
      .addHbarTransfer(env.multiSigAccId, new Hbar(-10))
      .addHbarTransfer(env.acc4.id, new Hbar(10))
      .setNodeAccountIds([new AccountId(3)])
      .freezeWith(client);

    const signTx = await (await tx.sign(env.acc1.privateKey)).sign(env.acc2.privateKey);

    const txResponse = await signTx.execute(client);

    const receipt = await txResponse.getReceipt(client);

    log.info(`transaction consensus status is ${receipt.status}`);

    const query = new AccountBalanceQuery().setAccountId(env.acc4.id);

    const balance = await query.execute(client);

    log.info(`the balance for account ${env.acc4.id} is ${balance.hbars} HBar`);
  }
}
