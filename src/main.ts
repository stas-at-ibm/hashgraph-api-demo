import { logger } from "./utils/logger";
import dotenv from "dotenv";
import { Client, Hbar, PrivateKey } from "@hashgraph/sdk";
import { HederaTestNetClient } from "./infrastructure/hedera.testnet.client";
import { AccountService } from "./services/account.service";

dotenv.config();

const myAccountId = <string>process.env.MY_ACCOUNT_ID;
const myPrivateKey = PrivateKey.fromString(<string>process.env.MY_PRIVATE_KEY);
const otherAccountId = <string>process.env.OTHER_ACCOUNT_ID;
const hedera = new HederaTestNetClient(myAccountId, myPrivateKey);
const accountService = new AccountService(hedera);

async function balanceOne() {
  // Sign with the client operator account private key and submit to a Hedera network
  const accountBalance = await accountService.getAccountBalanceById(myAccountId);

  if (accountBalance) {
    logger.info(
      `The account balance for account ${myAccountId} is ${accountBalance.hbars} HBar`,
    );

    logger.info(accountBalance, "All account Info:");
    logger.info(accountBalance.toString());
  }

  process.exit();
}

async function balanceTwo() {
  // Sign with the client operator account private key and submit to a Hedera network
  const accountBalance = await accountService.getAccountBalanceById(otherAccountId);

  if (accountBalance) {
    logger.info(
      `The account balance for someone else's account ${otherAccountId} is ${accountBalance.hbars} HBar`,
    );

    logger.info(accountBalance, "All account Info:");
    logger.info(accountBalance.toString());
  }

  process.exit();
}

async function transferOneTwo() {
  await accountService.transferHbar(myAccountId, otherAccountId, new Hbar(50));

  const accountBalanceMine = await accountService.getAccountBalanceById(myAccountId);
  const accountBalanceOther = await accountService.getAccountBalanceById(otherAccountId);

  logger.info(
    `my account balance ${accountBalanceMine.hbars} HBar, other account balance ${accountBalanceOther.hbars}`,
  );

  process.exit();
}

async function main() {
  //Grab your Hedera testnet account ID and private key from your .env file
  const myAccountId = process.env.MY_ACCOUNT_ID;
  const myPrivateKey = process.env.MY_PRIVATE_KEY;

  // If we weren't able to grab it, we should throw a new error
  if (!myAccountId || !myPrivateKey) {
    throw new Error(
      "Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present",
    );
  }

  // Create our connection to the Hedera network
  // The Hedera JS SDK makes this really easy!
  const client = Client.forTestnet();
  client.setOperator(myAccountId, myPrivateKey);
}

// balanceOne().catch((err) => {
//   logger.error(err);
// });

// balanceTwo().catch((err) => {
//   logger.error(err);
// });

transferOneTwo().catch((err) => {
  logger.error(err);
});
