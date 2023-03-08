import {
  AccountBalanceQuery,
  Hbar,
  TokenAssociateTransaction,
  TokenCreateTransaction,
  TokenType,
  TransferTransaction,
} from "@hashgraph/sdk";
import { log } from "src/utils/log";
import { env } from "src/utils/env";
import { client } from "src/utils/client";

export class TokenUseCase {
  static async createTokenAccount1() {
    const tx = new TokenCreateTransaction()
      .setTokenName("Game Token")
      .setTokenSymbol("GT")
      .setTokenType(TokenType.FungibleCommon)
      .setTreasuryAccountId(env.acc1.id)
      .setInitialSupply(1000)
      .setAdminKey(env.acc1.publicKey)
      .freezeWith(client);

    const signTx = await tx.sign(env.acc1.privateKey);

    const txResponse = await signTx.execute(client);

    const receipt = await txResponse.getReceipt(client);

    log.info(`transaction status is ${receipt.status}`);

    log.info(`the new token ID is ${receipt.tokenId}`);

    const query = new AccountBalanceQuery().setAccountId(env.acc1.id);

    const balance = await query.execute(client);

    log.info(`the balance of the user is: ${balance.tokens!.get(receipt.tokenId!)}`);
  }

  static async atomicSwap() {
    await associate();
    await swap();
    await logBalance();

    async function associate() {
      const tx = new TokenAssociateTransaction()
        .setAccountId(env.acc2.id)
        .setTokenIds([env.tokenId])
        .freezeWith(client);

      const signTx = await tx.sign(env.acc2.privateKey);

      const txResponse = await signTx.execute(client);

      const receipt = await txResponse.getReceipt(client);

      log.info(`transaction status is ${receipt.status}`);

      log.info(`token ${env.tokenId} associated with the user ${env.acc2.id} account`);
    }

    async function swap() {
      const tx = new TransferTransaction()
        .addHbarTransfer(env.acc2.id, new Hbar(-10))
        .addHbarTransfer(env.acc1.id, new Hbar(10))
        .addTokenTransfer(env.tokenId, env.acc1.id, -150)
        .addTokenTransfer(env.tokenId, env.acc2.id, 150)
        .freezeWith(client);

      const signTx = await (await tx.sign(env.acc1.privateKey)).sign(env.acc2.privateKey);

      const txResponse = await signTx.execute(client);

      const receipt = await txResponse.getReceipt(client);

      log.info(`transaction status is ${receipt.status}`);
    }

    async function logBalance() {
      const senderBalance = await new AccountBalanceQuery()
        .setAccountId(env.acc1.id)
        .execute(client);

      log.info(`the account balance for sender ${env.acc1.id} is ${senderBalance.hbars}`);
      log.info(
        `the token balance for sender ${env.acc1.id} is: ${senderBalance.tokens!.get(
          env.tokenId,
        )}`,
      );

      const recieverBalance = await new AccountBalanceQuery()
        .setAccountId(env.acc2.id)
        .execute(client);

      log.info(
        `the account balance for reciever ${env.acc2.id} is ${recieverBalance.hbars}`,
      );
      log.info(
        `the token balance for reciever ${env.acc2.id} is: ${recieverBalance.tokens!.get(
          env.tokenId,
        )}`,
      );
    }
  }
}
