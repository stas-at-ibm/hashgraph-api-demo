import { createAccounts, transferXfromMainTo } from "./use-cases/accounts.use.cases";
import { TokenUseCase } from "./use-cases/token.use.cases";
import { log } from "./utils/log";
import dotenv from "dotenv";
import { ScheduledUseCases } from "./use-cases/scheduled.use.cases";
import { MultiSigUseCases } from "./use-cases/multi.sig.use.cases";
import { ConsensusUseCases } from "./use-cases/consensus.use.cases";
import { SmartContractUseCases } from "./use-cases/smart.contract.use.cases";

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

// ConsensusUseCases.createProtectedTopic().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// ConsensusUseCases.submitTimestampAsMessage().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// ConsensusUseCases.submitMessageFail().catch((err) => {
//   logger.error(err);
//   process.exit();
// });

// SmartContractUseCases.deploySmartContract()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });

// SmartContractUseCases.callFunc1()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });

// SmartContractUseCases.deleteContract()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });
