import { logger } from "./utils/logger";
import dotenv from "dotenv";

dotenv.config();

logger.info("Hello World!");
logger.info(process.env.MY_ACCOUNT_ID);
