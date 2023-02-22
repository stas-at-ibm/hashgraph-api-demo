import dotenv from "dotenv";
import { AccountBalanceQuery, Hbar, PrivateKey, Wallet } from "@hashgraph/sdk";
import { HederaTestNetClient } from "src/infrastructure/hedera.testnet.client";
import { TokenService } from "src/services/token.service";
import { logger } from "src/utils/logger";
import { AccountService } from "src/services/account.service";

export class TokenUseCase {
  static async createTokenAccount1() {
    dotenv.config();

    const account1Id = <string>process.env.ACCOUNT1_ID;
    const account1PrivateKey = PrivateKey.fromString(process.env.ACCOUNT1_PRIVATE_KEY!);

    const hedera = new HederaTestNetClient(account1Id, account1PrivateKey);
    const tokenService = new TokenService(hedera);

    const account1AdminUser = new Wallet(account1Id, account1PrivateKey);
    const tokenId = await tokenService.createFungibleToken(
      "Game Token",
      "GT",
      1000,
      account1AdminUser,
    );

    const balanceQuery = new AccountBalanceQuery().setAccountId(
      account1AdminUser.accountId,
    );

    const tokenBalance = await balanceQuery.execute(hedera.client);
    logger.info(
      `the balance of the user ${account1Id} is: ${tokenBalance.tokens!.get(tokenId)}`,
    );

    process.exit();
  }

  static async atomicSwap() {
    const tokenId = process.env.TOKEN_ID!;
    const account1Id = process.env.ACCOUNT1_ID!;
    const account1PrivateKey = process.env.ACCOUNT1_PRIVATE_KEY!;
    const sender = new Wallet(account1Id, account1PrivateKey);
    const reciever = new Wallet(
      process.env.ACCOUNT2_ID!,
      process.env.ACCOUNT2_PRIVATE_KEY!,
    );

    const hedera = new HederaTestNetClient(account1Id, account1PrivateKey);
    const tokenService = new TokenService(hedera);
    const accountService = new AccountService(hedera);

    await (
      await tokenService.associateAccountWithToken(reciever, tokenId)
    ).atomicSwap(sender, reciever, tokenId, 150, new Hbar(10));

    const senderAccountBalance = await accountService.getAccountBalanceById(
      sender.accountId,
    );
    logger.info(
      `the account balance for sender account ${sender.accountId.toString()} is ${
        senderAccountBalance.hbars
      } HBar`,
    );
    logger.info(
      `the token balance for sender account  ${sender.accountId.toString()} is: ${senderAccountBalance.tokens!.get(
        tokenId,
      )}`,
    );

    const recieverAccountBalance = await accountService.getAccountBalanceById(
      reciever.accountId,
    );
    logger.info(
      `the account balance for reciever account ${reciever.accountId.toString()} is ${
        recieverAccountBalance.hbars
      } HBar`,
    );
    logger.info(
      `the token balance for reciever account  ${reciever.accountId.toString()} is: ${recieverAccountBalance.tokens!.get(
        tokenId,
      )}`,
    );

    process.exit();
  }
}
