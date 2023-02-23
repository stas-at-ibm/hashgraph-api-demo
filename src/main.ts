import { createAccounts, transferXfromMainTo } from "./use-cases/accounts.use.cases";
import { TokenUseCase } from "./use-cases/token.use.cases";
import { logger } from "./utils/logger";
import dotenv from "dotenv";
import { ScheduledUseCases } from "./use-cases/scheduled.use.cases";
import { MultiSigUseCases } from "./use-cases/multi.sig.use.cases";

dotenv.config();

// balanceOne().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// balanceTwo().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// transferOneTwo().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// createAccounts().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// transferXfromMainTo(process.env.ACCOUNT1_ID!, 500).catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// transferXfromMainTo(process.env.ACCOUNT2_ID!, 500).catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// TokenUseCase.createTokenAccount1().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// TokenUseCase.atomicSwap().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// ScheduledUseCases.scheduleTx().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// ScheduledUseCases.scheduleTxInfo().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// ScheduledUseCases.deleteTx().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// ScheduledUseCases.submitScheduleTx().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// MultiSigUseCases.createMultiKeyWallet().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// MultiSigUseCases.failingTx().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// MultiSigUseCases.successTx().catch((err) => {
//   logger.error(err);
//   process.exit();
// });
