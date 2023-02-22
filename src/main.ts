import { createAccounts, transferXfromMainTo } from "./use-cases/accounts.use.cases";
import { TokenUseCase } from "./use-cases/token.use.cases";
import { logger } from "./utils/logger";
import dotenv from "dotenv";

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
