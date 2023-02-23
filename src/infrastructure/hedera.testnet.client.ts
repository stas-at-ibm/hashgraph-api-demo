import { Client, PrivateKey } from "@hashgraph/sdk";
import { accounts } from "src/utils/accounts";

export class HederaTestNetClient {
  client: Client;

  constructor(operatorAccId?: string, operatorPrivateKey?: string | PrivateKey) {
    this.client = Client.forTestnet();
    this.client.setOperator(
      operatorAccId || accounts.main.accountId,
      operatorPrivateKey || accounts.main.privateKey,
    );
  }

  changeOperator(newOperatorAccId: string, newOperatorPrivateKey: string | PrivateKey) {
    this.client.setOperator(newOperatorAccId, newOperatorPrivateKey);
  }
}
