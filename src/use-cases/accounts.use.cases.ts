import {
  AccountBalanceQuery,
  AccountCreateTransaction,
  Hbar,
  PrivateKey,
  TransferTransaction,
} from "@hashgraph/sdk";
import fs from "fs";
import { log } from "src/utils/log";
import { client } from "src/utils/client";
import { env } from "src/utils/env";

interface Account {
  name: string;
  id: string;
  privateKey: string;
  publicKey: string;
}

export class AccountUseCases {
  static async createAccounts() {
    const accounts = await Promise.all(
      // ["account1", "account2", "account3", "account4", "account5"].map(
      // ["account6", "account7", "account8", "account9", "account10"].map(
      ["account11", "account12", "account13", "account14", "account15"].map(
        async (name) => await createOneAccount(name, 1),
      ),
    );

    for (const acc of accounts) {
      await logAccountInfo(acc);
    }

    for (const acc of accounts) {
      persistAccountToFs(acc);
    }

    async function createOneAccount(name: string, initHbar: number): Promise<Account> {
      const newPrivateKey = PrivateKey.generateED25519();
      const newPublicKey = newPrivateKey.publicKey;

      const txResponse = await new AccountCreateTransaction()
        .setKey(newPublicKey)
        .setInitialBalance(new Hbar(initHbar))
        .execute(client);

      const receipt = await txResponse.getReceipt(client);

      log.info(`transaction status is ${receipt.status}`);

      const newAccountId = receipt.accountId!;

      return {
        name,
        id: newAccountId.toString(),
        privateKey: newPrivateKey.toStringRaw(),
        publicKey: newPublicKey.toStringRaw(),
      };
    }

    async function logAccountInfo(acc: Account) {
      const balance = await new AccountBalanceQuery()
        .setAccountId(acc.id)
        .execute(client);

      log.info(`the new account name is: ${acc.name}`);
      log.info(`the new account ID is: ${acc.id}`);
      log.info(`the new account private key is: ${acc.privateKey}`);
      log.info(`the new account public key is: ${acc.publicKey}`);
      log.info(`the new account balance is: ${balance.hbars}\n`);
    }

    function persistAccountToFs(acc: Account) {
      const path = `${__dirname.replace("/src/use-cases", "")}/artifacts/${
        acc.name
      }.json`;
      fs.writeFileSync(path, JSON.stringify(acc, null, 2));

      log.info(
        `persisted account ${acc.name} to path: <project-root>/artifacts/${acc.name}.json`,
      );
    }
  }

  static async transfer() {
    const tx = new TransferTransaction()
      .addHbarTransfer(env.mainAcc.id, new Hbar(-100))
      .addHbarTransfer(env.acc1.id, new Hbar(100));

    log.info(`transfering Hbar from ${env.mainAcc.id} to ${env.acc1.id}`);

    const txResponse = await tx.execute(client);

    const receipt = await txResponse.getReceipt(client);

    log.info(`transaction status is ${receipt.status}`);

    await logBalance(env.mainAcc.id);
    await logBalance(env.acc1.id);

    async function logBalance(id: string) {
      const balance = await new AccountBalanceQuery().setAccountId(id).execute(client);

      log.info(`the account ${id} balance is: ${balance.hbars}`);
    }
  }
}
