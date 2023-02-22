import {
  AccountBalanceQuery,
  Client,
  TokenCreateTransaction,
  TokenId,
  TokenInfoQuery,
  TokenType,
  Wallet,
} from "@hashgraph/sdk";
import { HederaTestNetClient } from "src/infrastructure/hedera.testnet.client";
import { logger } from "src/utils/logger";

export class TokenService {
  #client: Client;

  constructor(hedera: HederaTestNetClient) {
    this.#client = hedera.client;
  }

  async createFungibleToken(
    tokenName: string,
    tokenSymbol: string,
    initialSupply: number,
    adminUser: Wallet,
  ): Promise<TokenId> {
    //Create the transaction and freeze for manual signing
    const transaction = await new TokenCreateTransaction()
      .setTokenName(tokenName)
      .setTokenSymbol(tokenSymbol)
      .setTokenType(TokenType.FungibleCommon)
      .setTreasuryAccountId(adminUser.accountId)
      .setInitialSupply(initialSupply)
      .setAdminKey(adminUser.publicKey)
      .freezeWith(this.#client);

    //Sign the transaction with the client, who is set as admin and treasury account
    const signTx = await adminUser.signTransaction(transaction);

    //Submit to a Hedera network
    const txResponse = await signTx.execute(this.#client);

    //Get the receipt of the transaction
    const receipt = await txResponse.getReceipt(this.#client);

    //Get the token ID from the receipt
    const tokenId = receipt.tokenId!;

    logger.info(`the new token ID is ${tokenId}`);

    //Sign with the client operator private key, submit the query to the network and get the token supply
    const name = await this.#queryTokenFunction("name", tokenId);
    const symbol = await this.#queryTokenFunction("symbol", tokenId);
    const tokenSupply = await this.#queryTokenFunction("totalSupply", tokenId);

    logger.info(`the total supply of the ${name} token is ${tokenSupply} of ${symbol}`);

    //Create the query
    const balanceQuery = new AccountBalanceQuery().setAccountId(adminUser.accountId);

    //Sign with the client operator private key and submit to a Hedera network
    const tokenBalance = await balanceQuery.execute(this.#client);

    logger.info(`the balance of the user is: ${tokenBalance.tokens!.get(tokenId)}`);

    return tokenId;
  }

  async #queryTokenFunction(
    functionName: "name" | "symbol" | "totalSupply",
    tokenId: TokenId,
  ) {
    //Create the query
    const query = new TokenInfoQuery().setTokenId(tokenId);

    logger.info(`retrieveing the ${functionName}`);
    const body = await query.execute(this.#client);

    //Sign with the client operator private key, submit the query to the network and get the token supply
    let result;
    if (functionName === "name") {
      result = body.name;
    } else if (functionName === "symbol") {
      result = body.symbol;
    } else if (functionName === "totalSupply") {
      result = body.totalSupply;
    } else {
      return;
    }

    return result;
  }
}
