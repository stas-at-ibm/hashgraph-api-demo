import { TopicCreateTransaction, TopicMessageSubmitTransaction } from "@hashgraph/sdk";
import { HederaTestNetClient } from "src/infrastructure/hedera.testnet.client";
import { env } from "src/utils/env";
import { log } from "src/utils/logger";

export class ConsensusUseCases {
  static async createProtectedTopic() {
    const client = new HederaTestNetClient().client;

    const tx = new TopicCreateTransaction()
      .setSubmitKey(env.acc1.publicKey)
      .setTopicMemo("Hedera HG News");

    const txResponse = await tx.execute(client);

    const receipt = await txResponse.getReceipt(client);

    log.info(`transaction consensus status is ${receipt.status}`);

    log.info(`your topic ID is: ${receipt.topicId}`);

    process.exit();
  }

  static async submitTimestampAsMessage() {
    const client = new HederaTestNetClient().client;

    const signTx = await new TopicMessageSubmitTransaction({
      topicId: env.topicId,
      message: `this is a timestamp from message submit: ${Date.now().toString()}`,
    })
      .freezeWith(client)
      .sign(env.acc1.privateKey);

    const txResponse = await signTx.execute(client);

    const receipt = await txResponse.getReceipt(client);

    log.info(`transaction consensus status is ${receipt.status}`);

    process.exit();
  }

  static async submitMessageFail() {
    const client = new HederaTestNetClient().client;

    const tx = new TopicMessageSubmitTransaction({
      topicId: env.topicId,
      message: "this massage will fail",
    });

    const txResponse = await tx.execute(client);

    try {
      const receipt = await txResponse.getReceipt(client);
      log.info(`transaction consensus status is ${receipt.status}`);
    } catch (error) {
      log.error(error, `failed authorization`);
    }

    process.exit();
  }
}
