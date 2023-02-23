import dotenv from "dotenv";

dotenv.config();

export const accounts = {
  main: {
    name: "main",
    id: process.env.MY_ACCOUNT_ID!,
    privateKey: process.env.MY_PRIVATE_KEY!,
    publicKey: process.env.MY_PUBLIC_KEY!,
  },
  acc1: {
    name: "account1",
    id: process.env.ACCOUNT1_ID!,
    privateKey: process.env.ACCOUNT1_PRIVATE_KEY!,
    publicKey: process.env.ACCOUNT1_PUBLIC_KEY!,
  },
  acc2: {
    name: "account2",
    id: process.env.ACCOUNT2_ID!,
    privateKey: process.env.ACCOUNT2_PRIVATE_KEY!,
    publicKey: process.env.ACCOUNT2_PUBLIC_KEY!,
  },
  acc3: {
    name: "account3",
    id: process.env.ACCOUNT3_ID!,
    privateKey: process.env.ACCOUNT3_PRIVATE_KEY!,
    publicKey: process.env.ACCOUNT3_PUBLIC_KEY!,
  },
  acc4: {
    name: "account4",
    id: process.env.ACCOUNT4_ID!,
    privateKey: process.env.ACCOUNT4_PRIVATE_KEY!,
    publicKey: process.env.ACCOUNT4_PUBLIC_KEY!,
  },
  acc5: {
    name: "account5",
    id: process.env.ACCOUNT5_ID!,
    privateKey: process.env.ACCOUNT5_PRIVATE_KEY!,
    publicKey: process.env.ACCOUNT5_PUBLIC_KEY!,
  },
};
