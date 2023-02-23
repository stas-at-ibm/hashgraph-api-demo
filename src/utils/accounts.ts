import dotenv from "dotenv";

dotenv.config();

export const accounts = {
  main: {
    name: "main",
    accountId: process.env.MY_ACCOUNT_ID!,
    privateKey: process.env.MY_PRIVATE_KEY!,
    publicKey: process.env.MY_PUBLIC_KEY!,
  },
  account1: {
    name: "account1",
    accountId: process.env.ACCOUNT1_ID!,
    privateKey: process.env.ACCOUNT1_PRIVATE_KEY!,
    publicKey: process.env.ACCOUNT1_PUBLIC_KEY!,
  },
  account2: {
    name: "account2",
    accountId: process.env.ACCOUNT2_ID!,
    privateKey: process.env.ACCOUNT2_PRIVATE_KEY!,
    publicKey: process.env.ACCOUNT2_PUBLIC_KEY!,
  },
  account3: {
    name: "account3",
    accountId: process.env.ACCOUNT3_ID!,
    privateKey: process.env.ACCOUNT3_PRIVATE_KEY!,
    publicKey: process.env.ACCOUNT3_PUBLIC_KEY!,
  },
  account4: {
    name: "account4",
    accountId: process.env.ACCOUNT4_ID!,
    privateKey: process.env.ACCOUNT4_PRIVATE_KEY!,
    publicKey: process.env.ACCOUNT4_PUBLIC_KEY!,
  },
  account5: {
    name: "account5",
    accountId: process.env.ACCOUNT5_ID!,
    privateKey: process.env.ACCOUNT5_PRIVATE_KEY!,
    publicKey: process.env.ACCOUNT5_PUBLIC_KEY!,
  },
};
