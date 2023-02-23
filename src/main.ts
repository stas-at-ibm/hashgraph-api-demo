import { createAccounts, transferXfromMainTo } from "./use-cases/accounts.use.cases";
import { TokenUseCase } from "./use-cases/token.use.cases";
import { log } from "./utils/log";
import { ScheduledUseCases } from "./use-cases/scheduled.use.cases";
import { MultiSigUseCases } from "./use-cases/multi.sig.use.cases";
import { ConsensusUseCases } from "./use-cases/consensus.use.cases";
import { SmartContractUseCases } from "./use-cases/smart.contract.use.cases";

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

// TOKEN
// TokenUseCase.createTokenAccount1()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });

// TokenUseCase.atomicSwap()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });

// SCHEDULE
// ScheduledUseCases.scheduleTx()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });

// ScheduledUseCases.scheduleTxInfo()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });

// ScheduledUseCases.deleteTx()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });

// ScheduledUseCases.submitScheduleTx()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });

// MULTISIG
// MultiSigUseCases.createMultiKeyWallet()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });

// MultiSigUseCases.failingTx()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });

// MultiSigUseCases.successTx()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });

// CONSENSUS
// ConsensusUseCases.createProtectedTopic()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });

// ConsensusUseCases.submitTimestampAsMessage()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });

// ConsensusUseCases.submitMessageFail()
//   .then(() => {
//     logger.info("done...");
//     process.exit();
//   })
//   .catch((err) => {
//     logger.error(err);
//     process.exit();
//   });

// SMART CONTRACT
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
