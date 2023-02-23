import {
  AccountBalanceQuery,
  AccountCreateTransaction,
  AccountId,
  Hbar,
  KeyList,
  TransferTransaction,
} from "@hashgraph/sdk";
import { HederaTestNetClient } from "src/infrastructure/hedera.testnet.client";
import { env } from "src/utils/env";
import { log } from "src/utils/log";

export class MultiSigUseCases {
  static async createMultiKeyWallet() {
    const client = new HederaTestNetClient().client;

    const keyList = new KeyList(
      [env.acc1.publicKey, env.acc2.publicKey, env.acc3.publicKey],
      2,
    );

    const newAccount = await new AccountCreateTransaction()
      .setKey(keyList)
      .setInitialBalance(new Hbar(20))
      .execute(client);

    // Get the new account ID
    const receipt = await newAccount.getReceipt(client);
    const newAccountId = receipt.accountId!;

    log.info(`the new account ID is: ${newAccountId}`);

    // Verify the account balance
    const accountBalance = await new AccountBalanceQuery()
      .setAccountId(newAccountId)
      .execute(client);

    log.info(`the new balance is: ${accountBalance.hbars} Hbar`);

    process.exit();
  }

  static async failingTx() {
    const client = new HederaTestNetClient().client;
    //The node account ID to submit the transaction to. You can add more than 1 node account ID to the list
    const nodeId = [];
    nodeId.push(new AccountId(3));

    //Create the transfer transaction
    const tx = await new TransferTransaction()
      .addHbarTransfer(env.multiSigAccId, new Hbar(-10))
      .addHbarTransfer(env.acc4.id, new Hbar(10))
      .setNodeAccountIds(nodeId)
      .freezeWith(client);

    // sign with acc1 only
    const signTx = await tx.sign(env.acc1.privateKey);

    const txResponse = await signTx.execute(client);

    const receipt = await txResponse.getReceipt(client);

    log.info(`transaction consensus status is ${receipt.status}`);

    process.exit();
  }

  static async successTx() {
    const client = new HederaTestNetClient().client;

    //The node account ID to submit the transaction to. You can add more than 1 node account ID to the list
    const nodeId = [];
    nodeId.push(new AccountId(3));

    //Create the transfer transaction
    const tx = await new TransferTransaction()
      .addHbarTransfer(env.multiSigAccId, new Hbar(-10))
      .addHbarTransfer(env.acc4.id, new Hbar(10))
      .setNodeAccountIds(nodeId)
      .freezeWith(client);

    // sign with acc1 and acc2
    let signTx = await tx.sign(env.acc1.privateKey);
    signTx = await tx.sign(env.acc2.privateKey);

    const txResponse = await signTx.execute(client);

    const receipt = await txResponse.getReceipt(client);

    log.info(`transaction consensus status is ${receipt.status}`);

    const query = new AccountBalanceQuery().setAccountId(env.acc4.id);

    // Sign with the client operator account private key and submit to a Hedera network
    const accountBalance = await query.execute(client);

    log.info(
      `The account balance for account ${env.acc4.id} is ${accountBalance.hbars} HBar`,
    );

    process.exit();
  }
}
