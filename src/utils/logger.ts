import pino from "pino";

export const logger = pino({
  namo: "hg-demo",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});
