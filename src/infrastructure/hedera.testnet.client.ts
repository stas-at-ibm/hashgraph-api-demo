import { Client, PrivateKey } from "@hashgraph/sdk";
import { env } from "src/utils/accounts";

export class HederaTestNetClient {
  client: Client;

  constructor(operatorAccId?: string, operatorPrivateKey?: string | PrivateKey) {
    this.client = Client.forTestnet();
    this.client.setOperator(
      operatorAccId || env.mainAcc.id,
      operatorPrivateKey || env.mainAcc.privateKey,
    );
  }

  changeOperator(newOperatorAccId: string, newOperatorPrivateKey: string | PrivateKey) {
    this.client.setOperator(newOperatorAccId, newOperatorPrivateKey);
  }
}
