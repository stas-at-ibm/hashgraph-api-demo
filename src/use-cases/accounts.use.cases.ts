import dotenv from "dotenv";
import { Hbar, PrivateKey } from "@hashgraph/sdk";
import fs from "fs";
import { HederaTestNetClient } from "src/infrastructure/hedera.testnet.client";
import { AccountService } from "src/services/account.service";
import { logger } from "src/utils/logger";

dotenv.config();

const myAccountId = <string>process.env.MY_ACCOUNT_ID;
const myPrivateKey = PrivateKey.fromString(<string>process.env.MY_PRIVATE_KEY);
const otherAccountId = <string>process.env.OTHER_ACCOUNT_ID;
const hedera = new HederaTestNetClient(myAccountId, myPrivateKey);
const accountService = new AccountService(hedera);

export async function balanceOne() {
  // Sign with the client operator account private key and submit to a Hedera network
  const accountBalance = await accountService.getAccountBalanceById(myAccountId);

  if (accountBalance) {
    logger.info(
      `The account balance for account ${myAccountId} is ${accountBalance.hbars} HBar`,
    );

    logger.info(accountBalance, "All account Info:");
    logger.info(accountBalance.toString());
  }
}

export async function balanceTwo() {
  // Sign with the client operator account private key and submit to a Hedera network
  const accountBalance = await accountService.getAccountBalanceById(otherAccountId);

  if (accountBalance) {
    logger.info(
      `The account balance for someone else's account ${otherAccountId} is ${accountBalance.hbars} HBar`,
    );

    logger.info(accountBalance, "All account Info:");
    logger.info(accountBalance.toString());
  }
}

export async function transferOneTwo() {
  await accountService.transferHbar(myAccountId, otherAccountId, new Hbar(50));

  const accountBalanceMine = await accountService.getAccountBalanceById(myAccountId);
  const accountBalanceOther = await accountService.getAccountBalanceById(otherAccountId);

  logger.info(
    `my account balance ${accountBalanceMine.hbars} HBar, other account balance ${accountBalanceOther.hbars}`,
  );
}

export async function createAccount() {
  const account = await accountService.createAccount();

  logger.info(`the new account private key is: ${account.privateKey}`);
  logger.info(`the new account public key is: ${account.publicKey}`);

  const path = `${__dirname}/artifacts/${account.name}.json`;
  fs.writeFileSync(path, JSON.stringify(account, null, 2));
}

export async function createAccounts() {
  const accounts = await Promise.all(
    ["account1", "account2", "account3", "account4", "account5"].map(
      async (accName) => await accountService.createAccount(accName),
    ),
  );

  accounts.forEach((account) => {
    logger.info(`the new account private key is: ${account.privateKey}`);
    logger.info(`the new account public key is: ${account.publicKey}`);

    const path = `${__dirname.replace("/use-cases", "")}/artifacts/${account.name}.json`;
    fs.writeFileSync(path, JSON.stringify(account, null, 2));
  });
}
