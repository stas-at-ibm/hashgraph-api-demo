import dotenv from "dotenv";
import { AccountBalanceQuery, PrivateKey, Wallet } from "@hashgraph/sdk";
import { HederaTestNetClient } from "src/infrastructure/hedera.testnet.client";
import { TokenService } from "src/services/token.service";
import { logger } from "src/utils/logger";

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
}
