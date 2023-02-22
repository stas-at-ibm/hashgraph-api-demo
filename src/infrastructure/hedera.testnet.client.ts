import { Client, PrivateKey } from "@hashgraph/sdk";

export class HederaTestNetClient {
  client: Client;

  constructor(operatorAccId: string, operatorPrivateKey: string | PrivateKey) {
    this.client = Client.forTestnet();
    this.client.setOperator(operatorAccId, operatorPrivateKey);
  }

  changeOperator(newOperatorAccId: string, newOperatorPrivateKey: string) {
    this.client.setOperator(newOperatorAccId, newOperatorPrivateKey);
  }
}
